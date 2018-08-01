const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    entry: './client/app.jsx',
    output: {
      path: path.join(__dirname, '/public/js'),
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
  },
];