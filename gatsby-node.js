/**
 * gatsby-node.js
 * Configures dynamic pages, SSG, and URL structure for Wulu.
 * Mirrors the minimalist, robust approach of top-end component libraries.
 */

const path = require("path");

// Create pages at build time for all dynamic [id] routes
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  // Example static ID arrays for SSG (replace with API/FS in production)
  const animeIDs = ["1", "2", "3"];      // Replace with real IDs (fetch from API/lib)
  const mangaIDs = ["1", "2", "3"];
  const manhwaIDs = ["1", "2"];
  const forumBoards = ["general", "news", "off-topic"];

  // Anime detail pages
  animeIDs.forEach(id => {
    createPage({
      path: `/anime/${id}/`,
      component: path.resolve("./src/pages/anime/[id].js"),
      context: { id }
    });
  });

  // Manga detail pages
  mangaIDs.forEach(id => {
    createPage({
      path: `/manga/${id}/`,
      component: path.resolve("./src/pages/manga/[id].js"),
      context: { id }
    });
  });

  // Manhwa detail pages
  manhwaIDs.forEach(id => {
    createPage({
      path: `/manhwa/${id}/`,
      component: path.resolve("./src/pages/manhwa/[id].js"),
      context: { id }
    });
  });

  // Forum board pages
  forumBoards.forEach(board => {
    createPage({
      path: `/forum/${board}/`,
      component: path.resolve("./src/pages/forum/[board].js"),
      context: { board }
    });
  });

  // Manga reader samples
  mangaIDs.forEach(id => {
    createPage({
      path: `/reader/${id}/`,
      component: path.resolve("./src/pages/reader/[id].js"),
      context: { id }
    });
  });

  // Video player for anime episodes (replace with real data)
  animeIDs.forEach(id => {
    createPage({
      path: `/player/${id}/`,
      component: path.resolve("./src/pages/player/[id].js"),
      context: { id }
    });
  });

  // You can add more programmatic page generations here as needed
};
