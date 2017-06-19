const env = require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const vueConfig = require('./vue-loader.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = isProd ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
  new ExtractTextPlugin({
    filename: 'common.[chunkhash].css',
  }),
]
: [
  new FriendlyErrorsPlugin(),
];

plugins.push(new webpack.DefinePlugin({
  'process.env.API_URL': JSON.stringify(process.env.API_URL),
  'process.env.ANALYTICS_ID': JSON.stringify(process.env.ANALYTICS_ID),
}));


module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      // preloaders
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
          },
        }],
      },
      // loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader',
          })
          : ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false,
  },
  plugins,
};
