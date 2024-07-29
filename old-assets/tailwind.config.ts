import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#B2B7A1",
      link: "#F0E7E0",
      logo: "#515031",
      cloud: "BCAA6E",
      button: "#D1B6A5",
      primary: "#EFE8E0",
    },
  },
  plugins: [],
};
export default config;
