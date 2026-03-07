import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { designSystemColors } from "@/config/theme";
import { publicationById, publications } from "@/data/publications";

type AppShellProps = {
  children: React.ReactNode;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const mainNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} />
  },
  {
    id: "library",
    label: "Library",
    href: "/library",
    icon: <MenuBookOutlinedIcon sx={{ fontSize: 18 }} />
  },
  {
    id: "citation",
    label: "Citation Manager",
    href: "/citation-manager",
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
  }
];

const secondaryNavItems: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: <SettingsOutlinedIcon sx={{ fontSize: 18 }} />
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 18 }} />
  }
];

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Box
      component={Link}
      href={item.href}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 0.75,
        py: 0.5,
        minHeight: 35,
        borderRadius: 0.5,
        textDecoration: "none",
        bgcolor: active ? designSystemColors.lavendar : "transparent",
        color: active ? "primary.main" : "text.primary",
        fontSize: 14,
        fontWeight: 500,
        width: "100%"
      }}
    >
      {item.icon}
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: "inherit" }}>
        {item.label}
      </Typography>
    </Box>
  );
}

export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const isPublicationPage = router.pathname === "/library/[articleId]";
  const articleId =
    typeof router.query.articleId === "string" ? router.query.articleId : "";
  const publication = publicationById[articleId] ?? publications[0];
  const sectionIds = React.useMemo(
    () => publication.sections.map((section) => section.id),
    [publication.sections]
  );
  const [activeSection, setActiveSection] = React.useState("abstract");

  const resolveSectionFromHash = React.useCallback(() => {
    if (typeof window === "undefined") {
      return sectionIds[0] ?? "abstract";
    }

    const hashSection = decodeURIComponent(
      window.location.hash.replace("#", "")
    );
    if (hashSection && sectionIds.includes(hashSection)) {
      return hashSection;
    }

    return sectionIds[0] ?? "abstract";
  }, [sectionIds]);

  React.useEffect(() => {
    if (!isPublicationPage) {
      return;
    }

    const updateFromHash = () => {
      setActiveSection(resolveSectionFromHash());
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [isPublicationPage, resolveSectionFromHash]);

  React.useEffect(() => {
    if (!isPublicationPage) {
      return;
    }

    const updateFromScroll = () => {
      const sectionElements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (!sectionElements.length) {
        return;
      }

      const offset = 180;
      let nextActive = sectionElements[0].id;

      sectionElements.forEach((element) => {
        if (element.getBoundingClientRect().top <= offset) {
          nextActive = element.id;
        }
      });

      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (nearBottom) {
        nextActive = sectionElements[sectionElements.length - 1].id;
      }

      setActiveSection((previous) =>
        previous === nextActive ? previous : nextActive
      );
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, [isPublicationPage, sectionIds]);

  const handleSectionNavigation = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, sectionId: string) => {
      event.preventDefault();

      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      const nextUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
      window.history.replaceState(null, "", nextUrl);
      setActiveSection(sectionId);
    },
    []
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default"
      }}
    >
      {isPublicationPage ? (
        <Box
          component="aside"
          sx={{
            width: 251,
            p: 5,
            bgcolor: "common.white",
            boxShadow: "0px 0px 20px 0px #1A1A1A0D",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto"
          }}
        >
          <Stack spacing={6}>
            <Typography
              sx={{
                fontSize: 44,
                lineHeight: 1,
                fontWeight: 700,
                color: "common.black"
              }}
            >
              Anchor
            </Typography>

            <Stack spacing={5}>
              <Stack spacing={2}>
                <Box
                  component={Link}
                  href="/library"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textDecoration: "none",
                    color: designSystemColors.grey,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "-0.1504px"
                  }}
                >
                  <ArrowBackOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500, color: "inherit" }}
                  >
                    Back to results
                  </Typography>
                </Box>

                <Box
                  component="a"
                  href="#references"
                  onClick={(event) =>
                    handleSectionNavigation(event, "references")
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textDecoration: "none",
                    color: designSystemColors.grey,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "20px",
                    letterSpacing: "-0.1504px"
                  }}
                >
                  <ArticleOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500, color: "inherit" }}
                  >
                    Jump to references
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    color: designSystemColors.grey
                  }}
                >
                  Table of Contents
                </Typography>

                <Stack spacing={0.5}>
                  {publication.sections.map((section) => {
                    const isActive = activeSection === section.id;
                    const tocColor = isActive
                      ? designSystemColors.blue
                      : section.level === 2
                        ? designSystemColors.grey
                        : "#464646";

                    return (
                      <Box
                        key={section.id}
                        component="a"
                        href={`#${section.id}`}
                        onClick={(event) =>
                          handleSectionNavigation(event, section.id)
                        }
                        sx={{
                          minHeight: 36,
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 1,
                          px: 1.5,
                          textDecoration: "none",
                          bgcolor: isActive ? "#EFF6FF" : "transparent",
                          color: tocColor,
                          pl: section.level === 2 ? 4 : 1.5,
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: "20px",
                          letterSpacing: "-0.1504px"
                        }}
                      >
                        <Typography sx={{ fontSize: 14, color: "inherit" }}>
                          {section.title}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box
          component="aside"
          sx={{
            width: 240,
            p: 5,
            bgcolor: "common.white",
            boxShadow: "0px 0px 20px 0px #1A1A1A0D",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            height: "100vh"
          }}
        >
          <Stack spacing={6}>
            <Typography
              sx={{
                fontSize: 44,
                lineHeight: 1,
                fontWeight: 700,
                color: "common.black"
              }}
            >
              Anchor
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                sx={{ fontSize: 12, fontWeight: 500, color: "text.secondary" }}
              >
                Title
              </Typography>
              <Stack spacing={1}>
                {mainNavItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    active={router.pathname === item.href}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Stack spacing={1}>
              {secondaryNavItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  active={router.pathname === item.href}
                />
              ))}
            </Stack>

            <Divider />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 0.75,
                py: 0.5,
                color: "#920000",
                fontSize: 14,
                fontWeight: 500
              }}
            >
              <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: "inherit" }}
              >
                Log Out
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
