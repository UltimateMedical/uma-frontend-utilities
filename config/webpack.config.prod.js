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

const generateOutput = (libtar, dirname) => {
  return {
    output: {
      path: path.resolve(__dirname, `../dist/${dirname}`),
      filename: '[name].js',
      library: 'UmaUtils',
      libraryTarget: libtar
    }
  }
}

const cjs2 = {
  ...generateOutput('commonjs2', 'cjs2')
};

const umd = {
  ...generateOutput('umd', 'umd')
};

module.exports = [
  {...common, ...cjs2},
  {...common, ...umd}
];