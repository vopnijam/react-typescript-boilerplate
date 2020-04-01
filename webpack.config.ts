import packageJson from './package.json'; // tslint:disable-line no-default-import

import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  join as pathJoin,
  resolve as pathResolve,
} from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { DefinePlugin } from 'webpack';
import WebpackCleanupPlugin from 'webpack-cleanup-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';

import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

const styledComponentsTransformer = createStyledComponentsTransformer();

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://api.yourhomepage.ca';
const WEBSOCKET_ENDPOINT = process.env.WEBSOCKET_ENDPOINT || 'wss://api.yourhomepage.ca';
const NODE_ENV = process.env.NODE_ENV || 'production';
const IS_PRODUCTION = NODE_ENV === 'production';

module.exports = {
  context: pathJoin(__dirname, 'app'),
  devServer: {
    clientLogLevel: 'info',
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: false,
    inline: false,
    port: 8080,
    public: process.env.PUBLIC_URL,
    stats: 'errors-only',
  },
  devtool: IS_PRODUCTION ? '(none)' : 'inline-source-map',
  entry: {
    app: './app.tsx',
  },
  module: {
    rules: [
      {
        include: pathResolve(__dirname, 'app'),
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: !IS_PRODUCTION ? true : false,
          getCustomTransformers: !IS_PRODUCTION ? () => ({
            before: [styledComponentsTransformer],
          }) : undefined,
          transpileOnly: !IS_PRODUCTION ? true : false,
        },
        test: /\.tsx?$/,
      },
      {
        include: pathResolve(__dirname, 'app/assets'),
        test: /\.(a?png|svg)$/,
        use: 'url-loader?limit=10000',
      },
      {
        include: pathResolve(__dirname, 'app/assets'),
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2|json)$/,
        use: 'file-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'async',
          minChunks: 2,
        },
        vendors: {
          chunks: 'async',
          filename: IS_PRODUCTION ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: 'async',
      maxSize: 1024 * 1024 * 100, // 100KB
      name: true,
    },
  },
  output: {
    chunkFilename: IS_PRODUCTION ? '[name].[contenthash].js' : '[name].[hash].js',
    filename: IS_PRODUCTION ? '[contenthash].js' : '[hash].js',
    path: pathJoin(__dirname, 'build'),
    publicPath: '/',
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        API_ENDPOINT: JSON.stringify(API_ENDPOINT),
        NODE_ENV: JSON.stringify(NODE_ENV),
        WEBSOCKET_ENDPOINT: JSON.stringify(WEBSOCKET_ENDPOINT),
      },
    }),
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      favicon: pathResolve('./app/assets/favicons/favicon.ico'),
      filename: 'index.html',
      meta: {
        charset: 'utf-8',
        description: packageJson.description,
        title: packageJson.name,
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
      },
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: IS_PRODUCTION,
        html5: true,
        minifyCSS: IS_PRODUCTION,
        minifyJS: IS_PRODUCTION,
        removeComments: true,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeRedundantAttributes: IS_PRODUCTION,
        removeScriptTypeAttributes: IS_PRODUCTION,
        removeStyleLinkTypeAttributes: IS_PRODUCTION,
        removeTagWhitespace: false,
        useShortDoctype: true,
      },
      template: 'index.html',
    }),
    new WebpackPwaManifest({
      background_color: '#FFFFFF',
      description: packageJson.description,
      filename: 'manifest.json',
      fingerprints: false,
      icons: [
        {
          ios: true,
          sizes: [96, 128, 192, 256, 384, 512],
          src: pathResolve('./app/assets/favicons/apple-touch-icon.png'),
        },
        {
          ios: true,
          sizes: [120, 152, 167, 180],
          src: pathResolve(
            './app/assets/favicons/apple-touch-icon.png',
          ),
        },
        {
          ios: true,
          size: 180,
          src: pathResolve(
            './app/assets/favicons/apple-touch-icon.png',
          ),
        },
      ],
      inject: true,
      ios: true,
      name: 'ReactTypeScriptBoilerplate',
      short_name: 'ReactTypeScriptBoilerplate',
      theme_color: '#392DD8',
    }),
  ],
  resolve: {
    alias: {
      app: pathResolve(__dirname, 'app'),
    },
    cacheWithContext: false,
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    plugins: [new TsconfigPathsPlugin({})],
    symlinks: false,
  },
  target: 'web',
};
