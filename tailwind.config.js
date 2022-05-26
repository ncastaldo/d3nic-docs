module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        vueGreen: "rgb(66, 160, 126)",
        viridisGreen: "rgb(43, 151, 139)",
      },
    },
  },
  plugins: [],
};
