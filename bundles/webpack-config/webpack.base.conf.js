const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var webpack = require("webpack");

const DEV_MODE = process.env.NODE_ENV !== 'production'

let fromRoot = (...args) => {
  // Go back two directories
  return path.join('..', '..', ...args)
}

module.exports = {
  context: __dirname,
  entry: {
    main: fromRoot('assets/js/index.js'),
    home: fromRoot('project/home/assets/js/home.js'),
    pipes: fromRoot('project/home/assets/js/pipes.js'),
    scramble: fromRoot('project/home/assets/js/scramble.js'),
    team: fromRoot('project/team/assets/js/team.js'),
    speakers: fromRoot('project/program/assets/js/speakers.js')
  },
  module: {
    rules: [{
      // Extract CSS into separate files.
      // Adapted from https://github.com/webpack-contrib/sass-loader#in-production
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
    $: 'jquery',
   '$': 'jquery',
   jquery: 'jquery',
   jQuery: 'jquery',
 }),
  ],
  resolve: {
    alias: {
      // This enables us to use imports like
      // import "@/privacy/assets/js/main.js"
      // that point to the project/ directory.
      '@': path.resolve('../project')
    },
    modules: [
      // Use an absolute path for node_modules
      // Otherwise asset files would only search
      // in their own and parent directories.
      // https://webpack.js.org/configuration/resolve/#resolve-modules
      path.resolve('./node_modules')
    ]
  }
}
