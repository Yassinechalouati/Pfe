/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'button' : '#FFA447',
        'backg' : '#F9F4F0', 
        'elements' : '#B7E5B4',
        'button2' : '#F28585',
        'darkg' : '#767676',
        'lightg': '#E5E5E5',
        'lightbutton': '#FFF2E5',
        'errorbg' : '#ecc8c5',
        'errortext': '#c03b3a'
      }
    },
  },
  plugins: [],
}

