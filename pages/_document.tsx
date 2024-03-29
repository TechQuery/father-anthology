import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="https://tech-query.me/image/WebCell-0.png" />

        <link rel="manifest" href="/manifest.json" />
        <script src="https://polyfill.kaiyuanshe.cn/feature/PWAManifest.js"></script>

        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <body>
        <Main />

        <div id="authing-modal" />

        <NextScript />
      </body>
    </Html>
  );
}
