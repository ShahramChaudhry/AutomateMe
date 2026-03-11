import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'taptap-light-green': '#b6e4c5',
        'taptap-dark-green': '#003830',
        'taptap-red': '#fd3333',
        'taptap-peach': '#ffcab2',
        'taptap-cream': '#fbeee5',
      },
    },
  },
  plugins: [],
};
export default config;
