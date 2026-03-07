import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
        <EyeTracker enabled={isPublicationPage} />
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
