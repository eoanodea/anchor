import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { designSystemColors, layoutGrid } from "@/config/theme";

const desktopColumns = Array.from(
  { length: layoutGrid.desktop.columns },
  (_, index) => `desktop-col-${index + 1}`
);
const mobileColumns = Array.from(
  { length: layoutGrid.mobile.columns },
  (_, index) => `mobile-col-${index + 1}`
);

export default function Home() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box
        sx={{
          bgcolor: "common.black",
          px: { xs: 3, md: 9 },
          py: { xs: 5, md: 8 },
          color: "common.white"
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: designSystemColors.lightBlue, mb: 1 }}
        >
          Style Guide
        </Typography>
        <Typography variant="h1">Layout Guide</Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 10 },
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ mb: 4 }}>
            Spacing: Desktop
          </Typography>

          <Box
            sx={{
              width: "100%",
              maxWidth: `${layoutGrid.desktop.containerWidth}px`,
              display: "flex",
              alignItems: "stretch"
            }}
          >
            <Box
              sx={{
                width: `${layoutGrid.desktop.marginX}px`,
                height: `${layoutGrid.desktop.columnHeight}px`,
                bgcolor: "common.black",
                flexShrink: 0
              }}
            />
            <Grid
              container
              columns={layoutGrid.desktop.columns}
              columnSpacing={layoutGrid.desktop.gutter / 8}
              wrap="nowrap"
              sx={{ flex: 1, mx: `${layoutGrid.desktop.marginX / 8}px` }}
            >
              {desktopColumns.map((columnId) => (
                <Grid key={columnId} size={1}>
                  <Box
                    sx={{
                      bgcolor: designSystemColors.lightBlue,
                      height: `${layoutGrid.desktop.columnHeight}px`
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                width: `${layoutGrid.desktop.marginX}px`,
                height: `${layoutGrid.desktop.columnHeight}px`,
                bgcolor: "common.black",
                flexShrink: 0
              }}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h2" sx={{ mb: 4 }}>
            Spacing: Mobile
          </Typography>

          <Box
            sx={{
              width: "100%",
              maxWidth: `${layoutGrid.mobile.containerWidth}px`,
              display: "flex",
              alignItems: "stretch"
            }}
          >
            <Box
              sx={{
                width: `${layoutGrid.mobile.marginX}px`,
                height: `${layoutGrid.mobile.columnHeight}px`,
                bgcolor: "common.black",
                flexShrink: 0
              }}
            />
            <Grid
              container
              columns={layoutGrid.mobile.columns}
              columnSpacing={layoutGrid.mobile.gutter / 8}
              wrap="nowrap"
              sx={{ flex: 1, mx: `${layoutGrid.mobile.marginX / 8}px` }}
            >
              {mobileColumns.map((columnId) => (
                <Grid key={columnId} size={1}>
                  <Box
                    sx={{
                      bgcolor: designSystemColors.lightBlue,
                      height: `${layoutGrid.mobile.columnHeight}px`
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                width: `${layoutGrid.mobile.marginX}px`,
                height: `${layoutGrid.mobile.columnHeight}px`,
                bgcolor: "common.black",
                flexShrink: 0
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
