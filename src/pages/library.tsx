import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { designSystemColors } from "@/config/theme";
import { Publication, publications } from "@/data/publications";

const heroImages = {
  visualSupport: "/images/library/girl.png",
  userExperience: "/images/library/icon.png",
  assistiveReading: "/images/library/reading.png",
  technology: "/images/library/laptop.png"
} as const;

const filterTabs = ["Topics", "Researchers", "Journals", "Keywords"] as const;

const chips = [
  "Accessibility",
  "UX Research",
  "Cognitive Load",
  "Inclusive Design",
  "Assistive Tech",
  "Neurodiversity",
  "HCI"
] as const;

const topicCards = [
  {
    id: "visual-support",
    title: "Visual Support",
    image: heroImages.visualSupport
  },
  {
    id: "user-experience",
    title: "User Experience",
    image: heroImages.userExperience
  },
  {
    id: "assistive-reading",
    title: "Assistive Reading",
    image: heroImages.assistiveReading
  },
  { id: "technology", title: "Technology", image: heroImages.technology }
] as const;

function PublicationCard({
  id,
  badge,
  badgeBg,
  badgeColor,
  published,
  title,
  description,
  image
}: Publication) {
  return (
    <Box
      component={Link}
      href={`/library/${id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        bgcolor: "common.white",
        border: `1px solid ${designSystemColors.lightGrey}`,
        borderRadius: "10px",
        boxShadow: "0px 0px 20px 0px #1A1A1A0D",
        p: "25px",
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        transition: "box-shadow 0.15s ease",
        "&:hover": {
          boxShadow: "0px 0px 24px 0px #1A1A1A1A"
        }
      }}
    >
      <Box
        sx={{
          width: 152,
          height: 152,
          borderRadius: "10px",
          flexShrink: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 0.5,
              bgcolor: badgeBg,
              color: badgeColor,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: "16px"
            }}
          >
            {badge}
          </Box>
          <Typography
            sx={{ fontSize: 12, color: "#6a7282", lineHeight: "16px" }}
          >
            {published}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "24px",
              letterSpacing: "-0.3125px",
              color: "#101828"
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              letterSpacing: "-0.1504px",
              color: "#4a5565"
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 16, color: "#6a7282" }} />
              <Typography sx={{ fontSize: 14, color: "#6a7282" }}>
                1.2k
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ChatBubbleOutlineOutlinedIcon
                sx={{ fontSize: 16, color: "#6a7282" }}
              />
              <Typography sx={{ fontSize: 14, color: "#6a7282" }}>
                42
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ color: "#6a7282", display: "flex" }}>
              <BookmarkBorderOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ color: "#6a7282", display: "flex" }}>
              <ShareOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Library() {
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
          gap: "54px"
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Box
            sx={{
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                color: designSystemColors.grey
              }}
            >
              <SearchOutlinedIcon sx={{ fontSize: 16 }} />
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
                sx={{ fontSize: 20, color: designSystemColors.grey }}
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

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                {filterTabs.map((tab) => (
                  <Typography
                    key={tab}
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: 500,
                      color:
                        tab === "Topics" ? designSystemColors.blue : "#6a7282",
                      pb: 0.75,
                      borderBottom:
                        tab === "Topics"
                          ? `2px solid ${designSystemColors.blue}`
                          : "none"
                    }}
                  >
                    {tab}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" sx={{ color: "#280532" }}>
                  <GridViewRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: "#9ca3af" }}>
                  <ViewListRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: "auto", pb: 0.5 }}
            >
              {chips.map((chip, index) => (
                <Chip
                  key={chip}
                  label={chip}
                  sx={{
                    height: 38,
                    borderRadius: "999px",
                    bgcolor:
                      index === 0
                        ? designSystemColors.lavendar
                        : "common.white",
                    border: index === 0 ? "none" : "1px solid #e5e7eb",
                    color: index === 0 ? "#280532" : "#364153",
                    fontSize: 14,
                    fontWeight: 500,
                    px: 1
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {topicCards.map((card) => (
            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  height: 248,
                  borderRadius: 1.5,
                  overflow: "hidden",
                  boxShadow: "0px 0px 20px 0px #1A1A1A0D",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  pb: 4,
                  px: 3
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.24) 23.992%, rgba(0,0,0,0.6) 100%)"
                  }}
                />
                <Typography
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    color: "common.white",
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.5
                  }}
                >
                  {card.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.5,
                color: "common.black"
              }}
            >
              Recent Suggested Publications
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 600, color: "primary.main" }}
            >
              View all
            </Typography>
          </Box>

          <Stack spacing={3}>
            {publications.map((publication) => (
              <PublicationCard key={publication.id} {...publication} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
