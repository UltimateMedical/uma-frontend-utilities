const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/'),
    'query-string/index': path.resolve(__dirname, '../src/query-string/'),
    'query-string/builder': path.resolve(__dirname, '../src/query-string/builder'),
    'query-string/parser': path.resolve(__dirname, '../src/query-string/parser'),
    'functions/index': path.resolve(__dirname, '../src/functions/'),
    'functions/isFalsy': path.resolve(__dirname, '../src/functions/isFalsy'),
    'v2/formParam/builder': path.resolve(__dirname, '../src/v2/formParam/builder'),
    'v2/queryString/parser': path.resolve(__dirname, '../src/v2/queryString/parser'),
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
  stats: "errors-only",
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};

const generateOutput = (libtar, dirname) => {
  return {
    output: {
      path: path.resolve(__dirname, `../dist`),
      filename: '[name].js',
      library: 'UmaUtils',
      libraryTarget: libtar
    }
  }
}

const cjs2 = {
  ...generateOutput('commonjs2', 'cjs2')
};

module.exports = [
  {...common, ...cjs2},
];