/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}',
    './index.html',             
    './**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],

}

