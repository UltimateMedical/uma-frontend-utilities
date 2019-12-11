const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    'query-string/index': path.resolve(__dirname, '../src/query-string/'),
    'query-string/builder': path.resolve(__dirname, '../src/query-string/builder'),
    'query-string/parser': path.resolve(__dirname, '../src/query-string/parser'),
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
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    })
  ],
  stats: "errors-only",
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
};

const cjs2 = {
  output: {
    path: path.resolve(__dirname, '../dist/cjs2'),
    filename: '[name].js',
    library: 'UmaUtils',
    libraryTarget: 'commonjs2'
  }
};

const umd = {
  output: {
    path: path.resolve(__dirname, '../dist/umd'),
    filename: '[name].js',
    library: 'UmaUtils',
    libraryTarget: 'umd'
  }
};

module.exports = [
  {...common, ...cjs2},
  {...common, ...umd}
];