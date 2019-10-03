const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};