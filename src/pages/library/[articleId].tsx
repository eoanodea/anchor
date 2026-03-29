import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import PanoramaFishEyeRoundedIcon from "@mui/icons-material/PanoramaFishEyeRounded";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useRouter } from "next/router";
import { designSystemColors } from "@/config/theme";
import { publicationById, publications } from "@/data/publications";
import VisualGuidanceSettingsDialog, {
  VisualGuidanceSettings
} from "@/components/VisualGuidanceSettingsDialog";

export default function ArticleDetail() {
  const FOCUS_DWELL_MS = 500;
  const HORIZONTAL_LOOK_PADDING = 300;
  const VERTICAL_LOOK_PADDING = 30;
  const MAX_LOOK_DISTANCE = 58;
  const SECTION_CENTER_DEAD_ZONE_PX = 26;
  const SECTION_CENTER_MIN_SCROLL_PX_PER_SEC = 24;
  const SECTION_CENTER_MAX_SCROLL_PX_PER_SEC = 95;

  const router = useRouter();
  const articleId =
    typeof router.query.articleId === "string" ? router.query.articleId : "";
  const publication = publicationById[articleId] ?? publications[0];
  const sectionElementsRef = React.useRef<Record<string, HTMLElement | null>>(
    {}
  );
  const [lockedSectionId, setLockedSectionId] = React.useState<string | null>(
    null
  );
  const [isCalibrationActive, setIsCalibrationActive] = React.useState(false);
  const [isTrackingActive, setIsTrackingActive] = React.useState(false);
  const [visualGuidanceSettings, setVisualGuidanceSettings] =
    React.useState<VisualGuidanceSettings>({
      scrollEnabled: true,
      paragraphHighlightEnabled: true
    });
  const [isVisualGuidanceSettingsOpen, setIsVisualGuidanceSettingsOpen] =
    React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOpenSettings = () => {
      setIsVisualGuidanceSettingsOpen(true);
    };

    window.addEventListener(
      "anchor:open-visual-guidance-settings",
      handleOpenSettings
    );

    return () => {
      window.removeEventListener(
        "anchor:open-visual-guidance-settings",
        handleOpenSettings
      );
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let animationFrameId = 0;
    let latestPoint: { x: number; y: number } | null = null;
    let pendingCandidateSectionId = "";
    let pendingCandidateStart = 0;

    const resolveFocusedSection = () => {
      animationFrameId = 0;
      if (!latestPoint || isCalibrationActive) {
        return;
      }
      const gazePoint = latestPoint;

      const entries = Object.entries(sectionElementsRef.current)
        .map(([sectionId, element]) => {
          if (!element) {
            return null;
          }

          const rect = element.getBoundingClientRect();
          const expandedLeft = rect.left - HORIZONTAL_LOOK_PADDING;
          const expandedRight = rect.right + HORIZONTAL_LOOK_PADDING;
          const expandedTop = rect.top - VERTICAL_LOOK_PADDING;
          const expandedBottom = rect.bottom + VERTICAL_LOOK_PADDING;

          const dx =
            gazePoint.x < expandedLeft
              ? expandedLeft - gazePoint.x
              : gazePoint.x > expandedRight
                ? gazePoint.x - expandedRight
                : 0;
          const dy =
            gazePoint.y < expandedTop
              ? expandedTop - gazePoint.y
              : gazePoint.y > expandedBottom
                ? gazePoint.y - expandedBottom
                : 0;

          return {
            sectionId,
            distance: Math.hypot(dx, dy)
          };
        })
        .filter((entry): entry is { sectionId: string; distance: number } => {
          if (!entry) {
            return false;
          }

          return entry.distance <= MAX_LOOK_DISTANCE;
        })
        .sort((first, second) => first.distance - second.distance);

      if (!entries.length) {
        return;
      }

      const nextFocusedSectionId = entries[0].sectionId;
      const now = performance.now();

      if (pendingCandidateSectionId !== nextFocusedSectionId) {
        pendingCandidateSectionId = nextFocusedSectionId;
        pendingCandidateStart = now;
        return;
      }

      if (now - pendingCandidateStart < FOCUS_DWELL_MS) {
        return;
      }

      setLockedSectionId((previous) =>
        previous === nextFocusedSectionId ? previous : nextFocusedSectionId
      );
    };

    const handleCalibrationState = (event: Event) => {
      const customEvent = event as CustomEvent<{
        isCalibrating: boolean;
        isTrackingActive: boolean;
      }>;

      const trackingIsOn = customEvent.detail.isTrackingActive;
      const calibrationIsOn = trackingIsOn && customEvent.detail.isCalibrating;
      setIsTrackingActive(trackingIsOn);
      setIsCalibrationActive(calibrationIsOn);

      if (!trackingIsOn || calibrationIsOn) {
        pendingCandidateSectionId = "";
        pendingCandidateStart = 0;
      }

      if (!trackingIsOn) {
        setLockedSectionId(null);
      }
    };

    const handleScrollingState = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>;
      setVisualGuidanceSettings((previous) => ({
        ...previous,
        scrollEnabled: customEvent.detail.enabled
      }));
    };

    window.addEventListener("anchor:calibration-state", handleCalibrationState);
    window.addEventListener("anchor:scrolling-state", handleScrollingState);

    const handleGaze = (event: Event) => {
      if (isCalibrationActive || !isTrackingActive) {
        return;
      }

      const customEvent = event as CustomEvent<{ x: number; y: number } | null>;
      latestPoint = customEvent.detail;

      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(resolveFocusedSection);
    };

    window.addEventListener("anchor:gaze", handleGaze);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("anchor:gaze", handleGaze);
      window.removeEventListener(
        "anchor:calibration-state",
        handleCalibrationState
      );
      window.removeEventListener(
        "anchor:scrolling-state",
        handleScrollingState
      );
    };
  }, [isCalibrationActive, isTrackingActive]);

  const activeFocusedSectionId = React.useMemo(
    () => (isCalibrationActive || !isTrackingActive ? null : lockedSectionId),
    [isCalibrationActive, isTrackingActive, lockedSectionId]
  );

  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      !isTrackingActive ||
      isCalibrationActive ||
      !visualGuidanceSettings.scrollEnabled
    ) {
      return;
    }

    if (!activeFocusedSectionId) {
      return;
    }

    let animationFrameId = 0;
    let lastTimestamp = 0;

    const step = (timestamp: number) => {
      const sectionElement = sectionElementsRef.current[activeFocusedSectionId];
      if (!sectionElement) {
        animationFrameId = 0;
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(step);
        return;
      }

      const elapsedSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const rect = sectionElement.getBoundingClientRect();
      const sectionCenterY = rect.top + rect.height / 2;
      const viewportCenterY = window.innerHeight / 2;
      const offset = sectionCenterY - viewportCenterY;
      const absoluteOffset = Math.abs(offset);

      if (absoluteOffset <= SECTION_CENTER_DEAD_ZONE_PX) {
        animationFrameId = 0;
        return;
      }

      const normalized = Math.min(
        (absoluteOffset - SECTION_CENTER_DEAD_ZONE_PX) /
          (window.innerHeight / 2 - SECTION_CENTER_DEAD_ZONE_PX),
        1
      );
      const speed =
        SECTION_CENTER_MIN_SCROLL_PX_PER_SEC +
        normalized *
          (SECTION_CENTER_MAX_SCROLL_PX_PER_SEC -
            SECTION_CENTER_MIN_SCROLL_PX_PER_SEC);

      const maxDelta = speed * elapsedSeconds;
      const delta = Math.sign(offset) * Math.min(absoluteOffset, maxDelta);

      const previousScrollY = window.scrollY;
      window.scrollBy({ top: delta, left: 0, behavior: "auto" });
      if (window.scrollY === previousScrollY) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    activeFocusedSectionId,
    isCalibrationActive,
    isTrackingActive,
    visualGuidanceSettings
  ]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "common.white" }}>
      <Box
        sx={{
          px: { xs: 3, md: 6, lg: "171px" },
          py: { xs: 5, md: "40px" },
          boxShadow: "0px 0px 20px 0px rgba(26,26,26,0.05)",
          bgcolor: "common.white"
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 775,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: 16, color: designSystemColors.grey }}>
                Home
              </Typography>
              <ChevronRightRoundedIcon
                sx={{ color: designSystemColors.grey, fontSize: 20 }}
              />
              <Typography sx={{ fontSize: 16, color: designSystemColors.grey }}>
                Somewhere
              </Typography>
              <ChevronRightRoundedIcon
                sx={{ color: designSystemColors.grey, fontSize: 20 }}
              />
              <Typography sx={{ fontSize: 16, color: "common.black" }}>
                Somewhere
              </Typography>
            </Box>
            <MoreHorizRoundedIcon
              sx={{ fontSize: 20, color: "common.black" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                px: "8.667px",
                py: "8px",
                borderRadius: "4.333px",
                bgcolor: publication.badgeBg
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "17.33px",
                  color: publication.badgeColor
                }}
              >
                {publication.badge}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: 14, lineHeight: "16px", color: "#6a7282" }}
            >
              {publication.published}
            </Typography>
          </Box>

          <Typography
            sx={{
              maxWidth: 708,
              fontSize: 40,
              lineHeight: 1.2,
              fontWeight: 600,
              color: "common.black"
            }}
          >
            {publication.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 424,
                maxWidth: "100%",
                height: 40,
                borderRadius: 0.5,
                border: `1px solid ${designSystemColors.lightGrey}`,
                bgcolor: "common.white",
                boxShadow: "0px 0px 20px 0px rgba(49,16,68,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <SearchOutlinedIcon
                  sx={{ fontSize: 16, color: designSystemColors.grey }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: designSystemColors.grey
                  }}
                >
                  Search
                </Typography>
              </Box>
              <MicNoneOutlinedIcon
                sx={{ fontSize: 20, color: designSystemColors.grey }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IosShareOutlinedIcon
                sx={{ fontSize: 20, color: "common.black" }}
              />
              <StarBorderRoundedIcon
                sx={{ fontSize: 20, color: "common.black" }}
              />
              <PanoramaFishEyeRoundedIcon
                sx={{ fontSize: 20, color: "common.black" }}
              />
              <ImportContactsOutlinedIcon
                sx={{ fontSize: 20, color: "common.black" }}
              />
              <IconButton
                onClick={() => setIsVisualGuidanceSettingsOpen(true)}
                size="small"
                sx={{ p: 0.25, color: "common.black" }}
                aria-label="Open visual guidance settings"
              >
                <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 3, md: 6, lg: "171px" },
          py: { xs: 6, md: "80px" },
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(241,240,253,0.75) 45%, rgba(216,237,255,0.65) 100%)"
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 920,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 6
          }}
        >
          <Box
            sx={{
              bgcolor: "common.white",
              borderRadius: "12px",
              boxShadow: "0px 0px 20px 0px rgba(26,26,26,0.05)",
              px: 6,
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "9999px",
                    backgroundImage: "url(/images/library/girl.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "9999px",
                    backgroundImage: "url(/images/library/icon.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    ml: -1
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#101828"
                  }}
                >
                  {publication.authorNames}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, lineHeight: "20px", color: "#6a7282" }}
                >
                  {publication.authorInstitution}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: `1px solid ${designSystemColors.blue}`,
                borderRadius: "8px",
                px: "17px",
                py: "9px"
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "20px",
                  color: designSystemColors.blue
                }}
              >
                Follow Authors
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: "common.white",
              borderRadius: "12px",
              boxShadow: "0px 0px 20px 0px rgba(26,26,26,0.05)",
              p: 6,
              display: "flex",
              flexDirection: "column",
              gap: 2.5
            }}
          >
            {publication.sections.map((section) => {
              const isDimmed =
                visualGuidanceSettings.paragraphHighlightEnabled &&
                !!activeFocusedSectionId &&
                activeFocusedSectionId !== section.id;

              return (
                <Box
                  key={section.id}
                  id={section.id}
                  ref={(element: HTMLDivElement | null) => {
                    sectionElementsRef.current[section.id] = element;
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    scrollMarginTop: "24px"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: section.level === 2 ? 20 : 32,
                      lineHeight: 1.3,
                      fontWeight: 600,
                      color: isDimmed
                        ? designSystemColors.grey
                        : "common.black",
                      opacity: isDimmed ? 0.58 : 1,
                      transition: "opacity 140ms ease-out, color 140ms ease-out"
                    }}
                  >
                    {section.title}
                  </Typography>

                  {section.paragraphs.map((paragraph) => (
                    <Typography
                      key={`${section.id}-${paragraph.slice(0, 40)}-${paragraph.length}`}
                      sx={{
                        fontSize: 18,
                        lineHeight: 1.68,
                        fontWeight: 400,
                        color: isDimmed
                          ? designSystemColors.grey
                          : "common.black",
                        opacity: isDimmed ? 0.58 : 1,
                        textAlign: "justify",
                        transition:
                          "opacity 140ms ease-out, color 140ms ease-out"
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <VisualGuidanceSettingsDialog
        open={isVisualGuidanceSettingsOpen}
        onClose={() => setIsVisualGuidanceSettingsOpen(false)}
        settings={visualGuidanceSettings}
        onSettingsChange={(nextSettings) =>
          setVisualGuidanceSettings((previous) => ({
            ...previous,
            ...nextSettings
          }))
        }
      />
    </Box>
  );
}
