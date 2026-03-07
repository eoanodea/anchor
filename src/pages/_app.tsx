import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "@/config/theme";
import AppShell from "@/components/AppShell";
import EyeTracker from "@/components/EyeTracker";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const isPublicationPage = props.router.pathname === "/library/[articleId]";

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "#anchor-mobile-lockout": {
              display: "none"
            },
            "@media (max-width:749px)": {
              "#anchor-app-content": {
                display: "none"
              },
              "#anchor-mobile-lockout": {
                display: "flex"
              }
            }
          }}
        />

        <Box id="anchor-app-content">
          <EyeTracker enabled={isPublicationPage} />
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </Box>

        <Box
          id="anchor-mobile-lockout"
          sx={{
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            textAlign: "center",
            bgcolor: "background.default"
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            This website is only available on larger screens
          </Typography>
        </Box>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
