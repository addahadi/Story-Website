/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Rubik', 'Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      boxShadow: {
        "custom-equal":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        black: {
          1: "#060606",
          2: "#242424",
        },
        white: {
          1: "#fff",
          2: "#808080",
          3: "#eef1f7",
          4: "#f0efea",
        },
        orange: {
          1: "#8266c9",
          2: "#f1eef9",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

