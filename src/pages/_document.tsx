import * as React from "react";
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext
} from "next/document";
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps
} from "@mui/material-nextjs/v16-pagesRouter";
import theme, { inter } from "@/config/theme";

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const restorePathScript = `(function(location){
  if (location.search.length > 1 && location.search[1] === '/') {
    var decoded = location.search
      .slice(1)
      .split('&')
      .map(function(segment){ return segment.replace(/~and~/g, '&'); })
      .join('?');
    var normalizedBasePath = ${JSON.stringify(basePath)};
    var isAtBaseRoot = location.pathname === normalizedBasePath + '/';

    if (isAtBaseRoot) {
      window.history.replaceState(
        null,
        '',
        normalizedBasePath + decoded + location.hash
      );
    }
  }
})(window.location);`;

  return (
    <Html lang="en" className={inter.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <script dangerouslySetInnerHTML={{ __html: restorePathScript }} />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
