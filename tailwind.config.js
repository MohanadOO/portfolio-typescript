/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#F4FCFF',
          black: '#042A44',
          gray: '#777777',
          400: '#7257D1',
        },
        secondary: {
          400: '#5F95D8',
        },
      },
      fontFamily: {
        lato: ['Lato', 'Cairo', 'sans-serif'],
        pattaya: ['Pattaya', 'Aref Ruqaa', 'sans-serif'],
      },
      boxShadow: {
        left: '-5px 5px 0 #042A44',
        right: '5px 5px 0 #042A44',
        'left-lg': '-7px 5px 0 #042A44',
        'right-lg': '7px 5px 0 #042A44',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
      addVariant('ar', '&:lang(ar)')
      addVariant('en', '&:lang(en)')
    },
  ],
}
