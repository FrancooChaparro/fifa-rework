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
        bgPrimary: "#0d0c14",
        bgGames: "#1a1823",
        primaryRed: "#c21741",
        hoverCard: "#bc2641",
        fontTitle: "#fcfbff",
        fontGames: "#abaab0"
      },
      backgroundImage: {
        bgHome: "radial-gradient(circle, #1a1823, #100e19)",
      },
      boxShadow: {
        'text': '0 0 10px rgba(179, 174, 174, 1)',
      },
      fontFamily: {
        geistLight: ["var(--font-geist-light)"],
        geistBold: ["var(--font-geist-bold)"],
        geistRegular:  ["var(--font-geist-regular)"],
      }
    }
  },
  plugins: [],
};
export default config;
