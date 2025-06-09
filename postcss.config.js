module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add cssnano in production for minification (optional)
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
