import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { designSystemColors } from "@/config/theme";

type EyeTrackerProps = {
  enabled?: boolean;
};

type GazePoint = {
  x: number;
  y: number;
};

type EyeTrackerStatus = "idle" | "loading" | "active" | "error";

type CalibrationTarget = {
  id: string;
  x: number;
  y: number;
};

type CalibrationHits = Record<string, number>;

type GazeEventDetail = {
  x: number;
  y: number;
} | null;

type CalibrationStateEventDetail = {
  isCalibrating: boolean;
  isTrackingActive: boolean;
};

type WebGazer = {
  begin: () => Promise<unknown>;
  end?: () => void;
  clearData?: () => Promise<void> | void;
  setTracker?: (name: string) => WebGazer;
  setRegression?: (name: string) => WebGazer;
  applyKalmanFilter?: (value: boolean) => WebGazer;
  addMouseEventListeners?: () => WebGazer;
  removeMouseEventListeners?: () => WebGazer;
  recordScreenPosition?: (x: number, y: number, eventType?: string) => WebGazer;
  setGazeListener: (
    listener: ((data: GazePoint | null, elapsedTime: number) => void) | null
  ) => WebGazer;
  showPredictionPoints?: (show: boolean) => WebGazer;
  showVideoPreview?: (show: boolean) => WebGazer;
  showFaceOverlay?: (show: boolean) => WebGazer;
  showFaceFeedbackBox?: (show: boolean) => WebGazer;
};

declare global {
  interface Window {
    webgazer?: WebGazer;
  }
}

const WEBGAZER_SCRIPT_SOURCES = [
  "/vendor/webgazer.js",
  "https://webgazer.cs.brown.edu/webgazer.js"
];
const REQUIRED_CALIBRATION_CLICKS = 2;
const CALIBRATION_TARGETS: CalibrationTarget[] = [
  { id: "top-left", x: 0.15, y: 0.18 },
  { id: "top-center", x: 0.5, y: 0.16 },
  { id: "top-right", x: 0.85, y: 0.18 },
  { id: "middle-left", x: 0.14, y: 0.5 },
  { id: "middle", x: 0.5, y: 0.5 },
  { id: "middle-right", x: 0.86, y: 0.5 },
  { id: "bottom-left", x: 0.15, y: 0.82 },
  { id: "bottom-center", x: 0.5, y: 0.84 },
  { id: "bottom-right", x: 0.85, y: 0.82 }
];

let webGazerLoadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const selector = `script[data-webgazer-src="${src}"]`;
    const existingScript = document.querySelector(
      selector
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.webgazer) {
        resolve();
        return;
      }

      const onLoad = () => {
        if (window.webgazer) {
          resolve();
          return;
        }
        reject(new Error(`WebGazer loaded without window.webgazer for ${src}`));
      };

      const onError = () => {
        reject(new Error(`Failed to load WebGazer script from ${src}`));
      };

      existingScript.addEventListener("load", onLoad, { once: true });
      existingScript.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.webgazerSrc = src;
    script.onload = () => {
      if (window.webgazer) {
        resolve();
        return;
      }
      reject(new Error(`WebGazer loaded without window.webgazer for ${src}`));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error(`Failed to load WebGazer script from ${src}`));
    };
    document.head.appendChild(script);
  });
}

function loadWebGazer(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("WebGazer can only run in the browser."));
  }

  if (window.webgazer) {
    return Promise.resolve();
  }

  if (!webGazerLoadPromise) {
    webGazerLoadPromise = (async () => {
      let lastError: unknown;

      for (const scriptSource of WEBGAZER_SCRIPT_SOURCES) {
        try {
          await loadScript(scriptSource);
          return;
        } catch (error) {
          lastError = error;
        }
      }

      throw lastError ?? new Error("Failed to load WebGazer.");
    })();
  }

  return webGazerLoadPromise;
}

export default function EyeTracker({ enabled = true }: EyeTrackerProps) {
  const [status, setStatus] = React.useState<EyeTrackerStatus>("idle");
  const [gazePoint, setGazePoint] = React.useState<GazePoint | null>(null);
  const [showGazeCursor, setShowGazeCursor] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [isTrackingRequested, setIsTrackingRequested] = React.useState(false);
  const [calibrationHits, setCalibrationHits] = React.useState<CalibrationHits>(
    {}
  );
  const [isCalibrating, setIsCalibrating] = React.useState(true);
  const [showCalibrationIntro, setShowCalibrationIntro] = React.useState(false);
  const [calibrationAnimationSeed, setCalibrationAnimationSeed] =
    React.useState(0);
  const [bootNonce, setBootNonce] = React.useState(0);

  const completedCalibrationPoints = React.useMemo(
    () =>
      CALIBRATION_TARGETS.filter(
        (target) =>
          (calibrationHits[target.id] ?? 0) >= REQUIRED_CALIBRATION_CLICKS
      ).length,
    [calibrationHits]
  );

  const isCalibrationComplete =
    completedCalibrationPoints === CALIBRATION_TARGETS.length;

  React.useEffect(() => {
    if (!enabled) {
      setIsTrackingRequested(false);
      setCalibrationHits({});
      setIsCalibrating(true);
      setShowCalibrationIntro(false);
      setShowGazeCursor(false);
      setErrorMessage("");
      setBootNonce(0);
    }
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled || !isTrackingRequested) {
      setStatus("idle");
      setGazePoint(null);
      window.dispatchEvent(
        new CustomEvent<GazeEventDetail>("anchor:gaze", { detail: null })
      );
      return;
    }

    let isCancelled = false;

    const initialize = async () => {
      setStatus("loading");
      setErrorMessage("");

      try {
        await loadWebGazer();

        if (isCancelled || !window.webgazer) {
          return;
        }

        const tracker = window.webgazer;

        tracker.setTracker?.("TFFacemesh");
        tracker.setRegression?.("ridge");
        tracker.applyKalmanFilter?.(true);

        tracker.showPredictionPoints?.(false);
        tracker.showVideoPreview?.(true);
        tracker.showFaceOverlay?.(true);
        tracker.showFaceFeedbackBox?.(true);

        tracker.setGazeListener((data) => {
          if (!data || isCancelled) {
            return;
          }

          const x = Math.min(Math.max(data.x, 0), window.innerWidth);
          const y = Math.min(Math.max(data.y, 0), window.innerHeight);
          setGazePoint({ x, y });
          window.dispatchEvent(
            new CustomEvent<GazeEventDetail>("anchor:gaze", {
              detail: { x, y }
            })
          );
        });

        await tracker.begin();
        tracker.addMouseEventListeners?.();

        if (!isCancelled) {
          setStatus("active");
        }
      } catch (error) {
        if (!isCancelled) {
          setStatus("error");
          const nextMessage =
            error instanceof Error
              ? error.message
              : "WebGazer failed to initialize.";
          setErrorMessage(nextMessage);
        }
      }
    };

    initialize();

    return () => {
      isCancelled = true;
      const tracker = window.webgazer;
      tracker?.setGazeListener(null);
      tracker?.removeMouseEventListeners?.();
      window.dispatchEvent(
        new CustomEvent<GazeEventDetail>("anchor:gaze", { detail: null })
      );
      try {
        tracker?.end?.();
      } catch {
        // no-op
      }
    };
  }, [enabled, bootNonce, isTrackingRequested]);

  React.useEffect(() => {
    const tracker = window.webgazer;
    tracker?.showVideoPreview?.(false);
    tracker?.showFaceOverlay?.(false);
    tracker?.showFaceFeedbackBox?.(false);
  }, [isCalibrationComplete, isCalibrating, status]);

  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<CalibrationStateEventDetail>("anchor:calibration-state", {
        detail: {
          isCalibrating: status === "active" && isCalibrating,
          isTrackingActive: status === "active"
        }
      })
    );
  }, [isCalibrating, status]);

  const handleCalibrationPointClick = React.useCallback(
    (target: CalibrationTarget) => {
      if (status !== "active") {
        return;
      }

      const x = window.innerWidth * target.x;
      const y = window.innerHeight * target.y;
      window.webgazer?.recordScreenPosition?.(x, y, "click");

      setCalibrationHits((previous) => {
        const currentCount = previous[target.id] ?? 0;
        const nextCount = Math.min(
          currentCount + 1,
          REQUIRED_CALIBRATION_CLICKS
        );

        return {
          ...previous,
          [target.id]: nextCount
        };
      });
    },
    [status]
  );

  const beginCalibrationFlow = React.useCallback(async () => {
    setCalibrationHits({});
    setIsCalibrating(true);
    setShowCalibrationIntro(true);
    await window.webgazer?.clearData?.();
  }, []);

  const handleConfirmCalibrationIntro = React.useCallback(() => {
    setShowCalibrationIntro(false);
    setCalibrationAnimationSeed((previous) => previous + 1);
  }, []);

  const handleStartTracking = React.useCallback(async () => {
    setErrorMessage("");
    setShowGazeCursor(false);
    await beginCalibrationFlow();
    setIsTrackingRequested(true);
  }, [beginCalibrationFlow]);

  const handleStopTracking = React.useCallback(() => {
    setIsTrackingRequested(false);
    setIsCalibrating(false);
    setShowCalibrationIntro(false);
    setGazePoint(null);
    window.dispatchEvent(
      new CustomEvent<GazeEventDetail>("anchor:gaze", { detail: null })
    );
  }, []);

  React.useEffect(() => {
    if (isCalibrationComplete) {
      setIsCalibrating(false);
      setShowCalibrationIntro(false);
    }
  }, [isCalibrationComplete]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 1500,
          px: 1.25,
          py: 0.5,
          borderRadius: "9999px",
          border: `1px solid ${designSystemColors.lightGrey}`,
          bgcolor: "common.white",
          boxShadow: "0px 0px 20px 0px rgba(49,16,68,0.04)",
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: 1.5,
            color:
              status === "active"
                ? designSystemColors.blue
                : status === "error"
                  ? designSystemColors.red
                  : designSystemColors.grey
          }}
        >
          {status === "loading" && "Eye tracking: starting"}
          {status === "active" &&
            (isCalibrating && !isCalibrationComplete
              ? `Eye tracking: calibrate (${completedCalibrationPoints}/${CALIBRATION_TARGETS.length})`
              : "Eye tracking: active")}
          {status === "error" && "Eye tracking: unavailable"}
          {status === "idle" && "Eye tracking: off"}
        </Typography>

        {(status === "active" || status === "loading") && (
          <Button
            size="small"
            variant="text"
            onClick={handleStopTracking}
            sx={{
              minWidth: 0,
              px: 0.5,
              fontSize: 11,
              lineHeight: 1.2,
              color: designSystemColors.red
            }}
          >
            Stop
          </Button>
        )}

        {status === "active" && (
          <Button
            size="small"
            variant="text"
            onClick={() => setShowGazeCursor((previous) => !previous)}
            sx={{
              minWidth: 0,
              px: 0.5,
              fontSize: 11,
              lineHeight: 1.2,
              color: designSystemColors.blue
            }}
          >
            {showGazeCursor ? "Cursor On" : "Cursor Off"}
          </Button>
        )}

        {status === "active" && (
          <Button
            size="small"
            variant="text"
            onClick={() => {
              if (isCalibrating) {
                setIsCalibrating(false);
                setShowCalibrationIntro(false);
                return;
              }

              void beginCalibrationFlow();
            }}
            sx={{
              minWidth: 0,
              px: 0.5,
              fontSize: 11,
              lineHeight: 1.2,
              color: designSystemColors.blue
            }}
          >
            {isCalibrating ? "Hide" : "Calibrate"}
          </Button>
        )}

        {(status === "idle" || status === "error") && (
          <Button
            size="small"
            variant="text"
            onClick={() => {
              if (status === "error") {
                setBootNonce((value) => value + 1);
              }
              void handleStartTracking();
            }}
            sx={{
              minWidth: 0,
              px: 0.5,
              fontSize: 11,
              lineHeight: 1.2,
              color: designSystemColors.blue
            }}
          >
            Start
          </Button>
        )}
      </Box>

      {status === "error" && errorMessage && (
        <Box
          sx={{
            position: "fixed",
            right: 16,
            bottom: 56,
            zIndex: 1500,
            maxWidth: 420,
            p: 1.5,
            borderRadius: 1,
            border: `1px solid ${designSystemColors.lightGrey}`,
            bgcolor: "common.white",
            boxShadow: "0px 0px 20px 0px rgba(49,16,68,0.04)"
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.4,
              color: designSystemColors.red
            }}
          >
            {errorMessage}
          </Typography>
        </Box>
      )}

      <AnimatePresence>
        {status === "active" && isCalibrating && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 1450,
              pointerEvents: "none"
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                bgcolor: alpha(designSystemColors.offWhite, 0.4)
              }}
            />

            <AnimatePresence>
              {showCalibrationIntro && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2
                  }}
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    sx={{
                      width: "min(480px, calc(100vw - 32px))",
                      p: 2,
                      borderRadius: 1,
                      border: `1px solid ${designSystemColors.lightGrey}`,
                      bgcolor: "common.white",
                      boxShadow: "0px 0px 20px 0px rgba(49,16,68,0.04)",
                      pointerEvents: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      textAlign: "center"
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        lineHeight: 1.5,
                        fontWeight: 600,
                        color: "common.black"
                      }}
                    >
                      Click each target twice to calibrate.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.4,
                        color: designSystemColors.grey
                      }}
                    >
                      Move your mouse to each target and click. Enable Cursor
                      from the control bar if you want visual debugging.
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleConfirmCalibrationIntro}
                      sx={{ px: 1.5, py: 0.5 }}
                    >
                      OK
                    </Button>
                  </Box>
                </Box>
              )}
            </AnimatePresence>

            {!showCalibrationIntro &&
              CALIBRATION_TARGETS.map((target, index) => {
                const hitCount = calibrationHits[target.id] ?? 0;
                const completionRatio = hitCount / REQUIRED_CALIBRATION_CLICKS;
                const isComplete = completionRatio >= 1;

                return (
                  <Box
                    key={`${calibrationAnimationSeed}-${target.id}`}
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.75, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.035,
                      ease: "easeOut"
                    }}
                    sx={{
                      pointerEvents: "auto",
                      position: "absolute",
                      zIndex: 1,
                      left: `${target.x * 100}%`,
                      top: `${target.y * 100}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <Button
                      onClick={() => handleCalibrationPointClick(target)}
                      sx={{
                        pointerEvents: "auto",
                        minWidth: 0,
                        width: 22,
                        height: 22,
                        borderRadius: "9999px",
                        border: `2px solid ${designSystemColors.blue}`,
                        bgcolor: isComplete
                          ? designSystemColors.blue
                          : "rgba(9,7,208,0.2)",
                        boxShadow: "0 0 0 5px rgba(9,7,208,0.15)",
                        "&:hover": {
                          bgcolor: isComplete
                            ? designSystemColors.blue
                            : "rgba(9,7,208,0.28)"
                        }
                      }}
                    />
                  </Box>
                );
              })}

            {!showCalibrationIntro && (
              <Button
                size="small"
                variant="text"
                onClick={() => setShowCalibrationIntro(true)}
                sx={{
                  position: "fixed",
                  left: 16,
                  bottom: 16,
                  zIndex: 2,
                  pointerEvents: "auto",
                  minWidth: 0,
                  px: 0.5,
                  fontSize: 12,
                  lineHeight: 1.2,
                  color: designSystemColors.blue
                }}
              >
                Help
              </Button>
            )}
          </Box>
        )}
      </AnimatePresence>

      {status === "active" && showGazeCursor && gazePoint && (
        <Box
          sx={{
            position: "fixed",
            width: 18,
            height: 18,
            borderRadius: "9999px",
            border: `2px solid ${designSystemColors.blue}`,
            boxShadow: `0 0 0 6px ${designSystemColors.lavendar}`,
            left: gazePoint.x - 9,
            top: gazePoint.y - 9,
            zIndex: 1550,
            pointerEvents: "none",
            transition: "left 40ms linear, top 40ms linear"
          }}
        />
      )}
    </>
  );
}
