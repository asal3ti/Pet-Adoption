import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: "#B2B7A1",
        background: "#B2B7A1",
        link: "#F0E7E0",
        logo: "#515031",
        logoNav: "#EEE0D7",
        cloud: "#BCAA6E", 
        button: "#D1B6A5",
        primary: "#EFE8E0",
        almond: "#DBD8D0",
        vanilla: "#DACBB5",
        darkGreen: "#364035"
      },
    },
  },
  plugins: [],
};

export default config;
