const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", './src/index.js'], // babel-polyfill associates with regenerator-runtime@0.10.5, used by generators, used by redux-saga
  output: {
    filename: './public/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]},

  plugins: [
    new ExtractTextPlugin('./public/css/bundle.css', {
      allChunks: true
    })
  ]
};
