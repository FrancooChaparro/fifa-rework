import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tiny: "385px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xm: "1150px",
      xl: "1280px",
      large: "1365px",
      "2xl": "1536px",
      "2.5xl": "1800px",
      "3xl": "1920px",
    },
    extend: {
      colors: { 
        pearl: "#f5dadf",
        bgChristmas: "#F8E7C9",
        wine: "#801323"
      }
    }
  },
  plugins: [],
};
export default config;
