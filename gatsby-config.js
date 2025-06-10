// gatsby-config.js

require("dotenv").config({
  path: `.env`, // load env for API keys etc
});

/**
 * Gatsby site configuration for Wulu: Static Anime & Manga Platform
 * Deployed to GitHub Pages via GitHub Actions with custom domain (wulu.in).
 */

module.exports = {
  siteMetadata: {
    title: "Wulu – Anime & Manga Platform",
    siteUrl: "https://wulu.in", // ✅ Use your actual domain
    description:
      "Wulu is an elegant, open anime & manga discovery platform featuring rich API integrations, community forums, and a modern UI.",
    author: "Your Name or Org",
  },

  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets\/|public\//,
        },
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inter:400,600,700,800`],
        display: "swap",
      },
    },

    // ✅ Keeping gh-pages plugin, but safely configured
    {
      resolve: `gatsby-plugin-gh-pages`,
      options: {
        path: `${__dirname}/public`,
        branch: "gh-pages", // Not used by GitHub Actions, but fine to keep
        message: "Deploy static build via Gatsby",
        prefixPaths: false, // ✅ IMPORTANT for custom domains
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Wulu – Anime & Manga Platform",
        short_name: "Wulu",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        display: "standalone",
        icon: "public/logo.png",
      },
    },

    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-offline`, // optional
  ],

  trailingSlash: "always",

  // ❌ Do NOT use pathPrefix when deploying to a custom domain
  // pathPrefix: "/wulu",
};
