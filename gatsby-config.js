// gatsby-config.js

require("dotenv").config({
  path: `.env`, // load env for API keys etc
});

/**
 * Gatsby site configuration for Wulu: Static Anime & Manga Platform
 * Follows the Minimal, Elegant Component Library UI design guidelines.
 */

module.exports = {
  siteMetadata: {
    title: "Wulu – Anime & Manga Platform",
    siteUrl: "https://your-github-username.github.io/wulu", // Set to your GitHub Pages URL
    description:
      "Wulu is an elegant, open anime & manga discovery platform featuring rich API integrations, community forums, and a modern UI.",
    author: "Your Name or Org",
  },

  plugins: [
    // Tailwind CSS (requires postcss as well)
    `gatsby-plugin-postcss`,

    // React Helmet for SEO/meta tags
    `gatsby-plugin-react-helmet`,

    // Import SVG as React components (for mascot/logo, etc)
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets\/|public\//, // All SVGs in your assets/public folders
        },
      },
    },

    // Google Fonts - Inter for elegant typography
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter:400,600,700,800`
        ],
        display: "swap",
      },
    },

    // Static Export Support (for GitHub Pages)
    {
      resolve: `gatsby-plugin-gh-pages`,
      options: {
        // Ensures clean static output for GitHub Pages
        path: `${__dirname}/public`,
        branch: "gh-pages",
        message: "Deploy static build via Gatsby",
        // Use "prefixPaths" if your repo is aliased, set to true on GitHub Pages
        prefixPaths: true,
      },
    },

    // Manifest for PWA features (theme color, favicon, etc)
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Wulu – Anime & Manga Platform",
        short_name: "Wulu",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0f172a", // Elegant, minimal dark blue
        display: "standalone",
        icon: "public/logo.png",
      },
    },

    // Sitemap for SEO
    `gatsby-plugin-sitemap`,

    // Offline plugin (optional—enable if you want PWA offline cache)
    // `gatsby-plugin-offline`,
  ],

  // Gatsby-style trailing slash: "always" | "never" | "ignore"
  trailingSlash: "always",

  // Path prefix for GitHub Pages deployment (replace with your repo name)
  pathPrefix: "/wulu",
};
