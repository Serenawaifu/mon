// src/pages/_app.js

import React from "react";
import Layout from "../components/Layout/Layout";

/**
 * Wraps all pages with global layout for consistent header, footer, and theming.
 */
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
