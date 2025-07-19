/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Define your color variables here
        "giigli-blue": "#1E40AF", // Primary Color
        "giigli-amber": "#FBBF24", // Secondary Color
        "giigli-red": "#EF4444", // Accent Color
        "giigli-gray": "#F9FAFB", // Background Color
        "giigli-dark-gray": "#1F2937", // Text Color
      },
    },
  },
  plugins: [],
};
