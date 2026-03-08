import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { designSystemColors } from "@/config/theme";
import { publications } from "@/data/publications";

function parsePublishedDate(published: string): number {
  const daysAgoMatch = published.match(/Published\s+(\d+)\s+days?\s+ago/i);
  if (daysAgoMatch) {
    const daysAgo = Number(daysAgoMatch[1]);
    return Date.now() - daysAgo * 24 * 60 * 60 * 1000;
  }

  const monthYearMatch = published.match(
    /Published\s+([A-Za-z]{3,9})\s+(\d{4})/i
  );
  if (monthYearMatch) {
    const parsedTime = new Date(
      `${monthYearMatch[1]} 1, ${monthYearMatch[2]}`
    ).getTime();
    return Number.isNaN(parsedTime) ? 0 : parsedTime;
  }

  return 0;
}

const recentSearchItems = [...publications]
  .sort(
    (leftPublication, rightPublication) =>
      parsePublishedDate(rightPublication.published) -
      parsePublishedDate(leftPublication.published)
  )
  .slice(0, 3)
  .map((publication) => ({
    id: publication.id,
    title: publication.title
  }));

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 3, md: "171px" },
        pt: { xs: 8, md: "100px" },
        pb: { xs: 10, md: "120px" },
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(241,240,253,0.75) 45%, rgba(216,237,255,0.65) 100%)"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 858,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Box>
            <Typography
              component="div"
              sx={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.5,
                letterSpacing: 0,
                background: `linear-gradient(90deg, ${designSystemColors.offBlack} 0%, ${designSystemColors.plum900} 12.097%, ${designSystemColors.plum700} 24.194%, ${designSystemColors.purple} 48.387%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Hi there, Ally!
            </Typography>
            <Typography
              component="div"
              sx={{
                fontSize: 36,
                fontWeight: 700,
                lineHeight: 1.5,
                letterSpacing: 0,
                background: `linear-gradient(90deg, ${designSystemColors.offBlack} 0%, ${designSystemColors.plum900} 25%, ${designSystemColors.plum700} 50%, ${designSystemColors.purple} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              What are you looking for today?
            </Typography>
          </Box>

          <Box
            sx={{
              height: 80,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                color: "text.secondary"
              }}
            >
              <SearchOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography
                sx={{ fontSize: 14, lineHeight: 1.5, color: "text.secondary" }}
              >
                Search by topic, paper, website or author
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                width: 60,
                justifyContent: "flex-end"
              }}
            >
              <MicNoneOutlinedIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(330deg, #2A0053 11.25%, #49284C 86.964%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <EastRoundedIcon sx={{ fontSize: 14, color: "common.white" }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 600, lineHeight: 1.5 }}>
              Recently Searched
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 600, color: "primary.main" }}
            >
              View all
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {recentSearchItems.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  component={Link}
                  href={`/library/${item.id}`}
                  sx={{
                    height: 140,
                    borderRadius: 1.5,
                    px: 2.5,
                    py: 4,
                    bgcolor: "rgba(255,255,255,0.1)",
                    boxShadow: "0px 0px 20px 0px rgba(26,26,26,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "box-shadow 0.15s ease",
                    "&:hover": {
                      boxShadow: "0px 0px 24px 0px rgba(26,26,26,0.12)"
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: designSystemColors.grey
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <ArticleOutlinedIcon
                      sx={{ fontSize: 16, color: designSystemColors.blue }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
