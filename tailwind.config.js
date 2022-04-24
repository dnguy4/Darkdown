module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '89%': '89%',
        '2/5': '40%',
        '9/10': '90%',
      },
      colors: {
        'prussian-blue': '#12263a',
        'rich-black': '#003637',
        'opal': '#c5d8d1',
        'alice-blue': '#f6fcfe',
        'light-salmon': '#f2a283',
      }
    },
  },
  plugins: [],
}