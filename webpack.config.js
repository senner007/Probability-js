const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
var path = require('path');

module.exports = {
  entry: './main.js',
  mode : "development",
  output: {
    path: path.resolve('./dist'),
    filename: 'bundled.js',
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  resolve: {
    fallback: {
        "os": require.resolve("os-browserify/browser")
    },
  },
};