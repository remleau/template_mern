module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-nested-ancestors'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
  ]
}