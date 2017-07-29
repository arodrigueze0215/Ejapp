module.exports = {
  map: true,
  from: './src-static/app.css',
  to: './static/css/app.bundle.css',
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },

  }
  
}