import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { designSystemColors } from "@/config/theme";

export type VisualGuidanceSettings = {
  scrollEnabled: boolean;
  paragraphHighlightEnabled: boolean;
};

type VisualGuidanceSettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  settings: VisualGuidanceSettings;
  onSettingsChange: (nextSettings: Partial<VisualGuidanceSettings>) => void;
};

export default function VisualGuidanceSettingsDialog({
  open,
  onClose,
  settings,
  onSettingsChange
}: VisualGuidanceSettingsDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "min(760px, calc(100vw - 32px))",
          borderRadius: "12px",
          border: `1px solid ${designSystemColors.lightGrey}`,
          boxShadow: "0px 0px 20px 0px rgba(26,26,26,0.05)",
          overflow: "hidden"
        }
      }}
    >
      <Box sx={{ display: "flex", height: 538, bgcolor: "common.white" }}>
        <Box
          sx={{
            width: 200,
            borderRight: `1px solid ${designSystemColors.lightGrey}`,
            bgcolor: "background.default",
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5
          }}
        >
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: "text.primary" }}
          >
            Reading Settings
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.25,
              height: 30,
              border: "1px solid #e5e7eb",
              borderRadius: 1,
              bgcolor: "common.white"
            }}
          >
            <SearchOutlinedIcon
              sx={{ fontSize: 14, color: designSystemColors.grey }}
            />
            <Typography sx={{ fontSize: 12, color: designSystemColors.grey }}>
              Search settings
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {[
              {
                label: "Typography",
                icon: <TextFieldsOutlinedIcon sx={{ fontSize: 14 }} />,
                active: false
              },
              {
                label: "Layout",
                icon: <GridViewOutlinedIcon sx={{ fontSize: 14 }} />,
                active: false
              },
              {
                label: "Visual Guidance",
                icon: <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />,
                active: true
              },
              {
                label: "Audio & Playback",
                icon: <GraphicEqOutlinedIcon sx={{ fontSize: 14 }} />,
                active: false
              },
              {
                label: "Accessibility",
                icon: <AccessibilityNewOutlinedIcon sx={{ fontSize: 14 }} />,
                active: false
              },
              {
                label: "Privacy & Control",
                icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 14 }} />,
                active: false
              }
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  height: 35.5,
                  borderRadius: "10px",
                  px: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  bgcolor: item.active
                    ? designSystemColors.lavendar
                    : "transparent",
                  color: item.active
                    ? designSystemColors.blue
                    : designSystemColors.grey
                }}
              >
                {item.icon}
                <Typography
                  sx={{
                    fontSize: 12.5,
                    fontWeight: item.active ? 600 : 400,
                    lineHeight: 1.4,
                    color: "inherit"
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              height: 48,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${designSystemColors.lightGrey}`
            }}
          >
            <Typography sx={{ fontSize: 13, color: designSystemColors.grey }}>
              Advanced Reading Settings
            </Typography>
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close settings"
            >
              <CloseRoundedIcon
                sx={{ fontSize: 16, color: designSystemColors.grey }}
              />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, px: 3, pt: 2.5, pb: 0.5 }}>
            <Typography sx={{ fontSize: 24, fontWeight: 600, lineHeight: 1.1 }}>
              Visual Guidance
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12.5,
                color: designSystemColors.grey,
                lineHeight: 1.5
              }}
            >
              Add subtle guidance to maintain reading position and reduce visual
              strain.
            </Typography>

            <Box sx={{ mt: 2.25 }}>
              {[
                {
                  title: "Line Highlight Mode",
                  description: "Highlight the active reading line.",
                  control: <Switch checked={false} disabled />
                },
                {
                  title: "Paragraph Focus Mode",
                  description: "Emphasise one paragraph at a time.",
                  control: (
                    <Switch
                      checked={settings.paragraphHighlightEnabled}
                      onChange={(_, checked) =>
                        onSettingsChange({ paragraphHighlightEnabled: checked })
                      }
                    />
                  )
                },
                {
                  title: "Auto Scroll",
                  description:
                    "Slowly center the active paragraph while reading.",
                  control: (
                    <Switch
                      checked={settings.scrollEnabled}
                      onChange={(_, checked) =>
                        onSettingsChange({ scrollEnabled: checked })
                      }
                    />
                  )
                },
                {
                  title: "Background Tint",
                  description:
                    "Apply subtle background overlay to reduce strain.",
                  control: (
                    <Select
                      value=""
                      displayEmpty
                      disabled
                      size="small"
                      sx={{
                        width: 114.5,
                        height: 33.5,
                        borderRadius: "10px",
                        "& .MuiSelect-select": {
                          fontSize: 12,
                          color: designSystemColors.grey
                        }
                      }}
                    >
                      <MenuItem value="">None</MenuItem>
                    </Select>
                  )
                },
                {
                  title: "Cursor Emphasis",
                  description: "Increase visibility of cursor for orientation.",
                  control: <Switch checked={false} disabled />
                }
              ].map((item) => (
                <Box key={item.title}>
                  <Box
                    sx={{
                      minHeight: 69.7,
                      pt: 2,
                      pb: 1,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 13.5,
                          fontWeight: 500,
                          lineHeight: 1.4
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          lineHeight: 1.4,
                          color: designSystemColors.grey
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                    <Box>{item.control}</Box>
                  </Box>
                  <Divider sx={{ borderColor: designSystemColors.lightGrey }} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              height: 52,
              px: 3,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
              borderTop: `1px solid ${designSystemColors.lightGrey}`
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: designSystemColors.lightGrey,
                color: designSystemColors.grey,
                borderRadius: "10px",
                fontSize: 12.5,
                fontWeight: 500,
                textTransform: "none",
                height: 32.75
              }}
            >
              Reset to defaults
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: designSystemColors.lavendar,
                color: designSystemColors.blue,
                borderRadius: "10px",
                boxShadow: "0px 1px 4px 0px rgba(108,142,239,0.3)",
                fontSize: 12.5,
                fontWeight: 500,
                textTransform: "none",
                height: 30.75,
                "&:hover": {
                  bgcolor: designSystemColors.lavendar
                }
              }}
            >
              Save changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
