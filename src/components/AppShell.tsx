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
import { designSystemColors } from "@/config/theme";

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

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default"
      }}
    >
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

      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
