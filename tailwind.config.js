/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all relevant source files for class names for purging unused styles
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Gatsby source files
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Typography and color palette matching your design system
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f4f5f7',
          200: '#e4e7ec',
          300: '#cbd2d9',
          400: '#9aa5b1',
          500: '#6b7280', // Body text neutral gray
          600: '#4b5563',
          700: '#374151',
          800: '#252f3f',
          900: '#161e2e',
        },
        black: '#000000',
        white: '#ffffff',
      },
      spacing: {
        // Consistent layout spacings (e.g. pt-16, pb-20 → 4rem, 5rem)
        '16': '4rem',
        '20': '5rem',
      },
      fontFamily: {
        // Elegant, bold typography using Inter font
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        // Headlines: large, bold, clear hierarchy
        '4xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],  // ~36px heavy
        '5xl': ['3rem', { lineHeight: '1', fontWeight: '700' }],          // 48px heavy
        '6xl': ['3.75rem', { lineHeight: '1', fontWeight: '800' }],       // 60px bold
      },
      borderRadius: {
        // Subtle rounded corners for cards and UI elements
        'xl': '0.75rem',
      },
      boxShadow: {
        // Light shadows for subtle elevation
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-md': '0 4px 6px rgba(0,0,0,0.1)'
      },
      transitionProperty: {
        // Smooth transitions for hover effects
        'colors': 'background-color, border-color, color, fill, stroke',
        'opacity-transform': 'opacity, transform',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        300: '300ms',
        400: '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // minimal, accessible form styles
    require('@tailwindcss/typography'), // elegant prose styles for content
  ],
};
