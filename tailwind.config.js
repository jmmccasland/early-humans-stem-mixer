module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#fff",
        "blue": "#0f37c9",
        "black": "#11181b",
        "silver": "#e6eaeb",
        "brown": "#884329"
      },
      fontSize: {
        "2xs": "0.6rem",
      },
      minWidth: {
        "min-w-7": "7rem"
      }
    },
    screens: {
      "desktop": "950px"
    }
  },
  plugins: [],
}
