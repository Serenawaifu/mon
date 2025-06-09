// src/pages/_app.js

import React from "react";
import Layout from "../components/Layout/Layout";

export default function App({ element }) {
  return <Layout>{element}</Layout>;
}
