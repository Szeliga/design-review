// eslint-disable-file
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var bourbon = require('bourbon').includePaths;
var pkg = require('./package.json');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var common = {
  entry: APP_PATH,
  resolve: {
    alias: {
      components: path.resolve(ROOT_PATH, 'app', 'components')
    },
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  exclude: [
    path.resolve(__dirname, "node_modules"),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(ROOT_PATH, 'app'),
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/, loader: 'file' }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Design review',
      template: 'index.html',
      inject: 'body'
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.scss$/,
          loader: `style!css!autoprefixer!sass?includePaths[]=${bourbon}`
        },
        {
          test: /\.jsx?$/,
          loader: 'react-hot',
          include: path.resolve(ROOT_PATH, 'app')
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build' || TARGET === 'stats' || TARGET === 'deploy') {
  module.exports = merge(common, {
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js?'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: APP_PATH
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', `css!autoprefixer!sass?includePaths[]=${bourbon}`),
          include: APP_PATH
        }
      ]
    },
    plugins: [
      new Clean(['build']),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ]
  });
}
