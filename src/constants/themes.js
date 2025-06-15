/**
 * Theme metadata array for Wulu app, following the Minimal, Elegant Component Library UI style.
 *
 * Each theme includes:
 * - id: unique theme identifier matching CSS class or context value
 * - name: human-readable display name (bold, elegant style)
 * - previewImage: path to preview thumbnail image (light background, subtle card style)
 *
 * These are used in the ThemeSwitcher UI and theme context/provider.
 */

const themes = [
  {
    id: "retro-pixel",
    name: "Retro Pixel",
    previewImage: "/assets/themes/retro-pixel.png",
  },
  {
    id: "sakura-blossom",
    name: "Sakura Blossom",
    previewImage: "/assets/themes/sakura-blossom.png",
  },
  {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    previewImage: "/assets/themes/cyberpunk-neon.png",
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    previewImage: "/assets/themes/minimal-light.png",
  },
  {
    id: "cozy-cafe",
    name: "Cozy Cafe",
    previewImage: "/assets/themes/cozy-cafe.png",
  },
];

export default themes;
