const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.ts',
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