/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        primary: {
          DEFAULT: '#00f0a8',
          foreground: '#060b0e',
        },
        secondary: {
          DEFAULT: '#00d2ff',
          foreground: '#060b0e',
        },
      },
    },
  },
  plugins: [],
}
