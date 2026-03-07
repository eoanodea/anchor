import Box from "@mui/material/Box";
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

export default function ArticleDetail() {
  const router = useRouter();
  const articleId =
    typeof router.query.articleId === "string" ? router.query.articleId : "";
  const publication = publicationById[articleId] ?? publications[0];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "common.white" }}>
      <Box
        sx={{
          px: { xs: 3, md: "171px" },
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
              <SettingsOutlinedIcon
                sx={{ fontSize: 20, color: "common.black" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 3, md: "171px" },
          py: { xs: 6, md: "80px" },
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(241,240,253,0.75) 45%, rgba(216,237,255,0.65) 100%)"
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 793,
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
            {publication.sections.map((section) => (
              <Box
                key={section.id}
                id={section.id}
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
                    color: "common.black"
                  }}
                >
                  {section.title}
                </Typography>

                {section.paragraphs.map((paragraph) => (
                  <Typography
                    key={`${section.id}-${paragraph}`}
                    sx={{
                      fontSize: 16,
                      lineHeight: 1.5,
                      fontWeight: 400,
                      color: "common.black",
                      textAlign: "justify"
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
