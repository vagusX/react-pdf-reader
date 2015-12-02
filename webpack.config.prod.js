var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var imageName = 'images/[name].[hash:8].[ext]'
var fontName = 'fonts/[name].[hash:8].[ext]'

var webpackConfig = require('./webpack.config.dev')

module.exports = {
  devtool: false,
  entry: {
    main: webpackConfig.entry.main,
    vendor: webpackConfig.entry.vendor.filter(function (x) { return x.match(/^webpack/) == null })
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'static/[name].[chunkhash:8].js',
    publicPath: './'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, loader: 'babel', include: /src/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?pack=default'), include: /src/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss?pack=default'), include: path.join(__dirname, 'node_modules') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!postcss?pack=default!less'), include: path.join(__dirname, 'node_modules') },
      { test: /\.(png|jpg|gif)$/, loader: 'url', query: { limit: 2048, name: imageName } },
      { test: /\.woff$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff', name: fontName } },
      { test: /\.woff2$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff2', name: fontName } },
      { test: /\.ttf$/, loader: 'url', query: { limit: 100, minetype: 'application/octet-stream', name: fontName } },
      { test: /\.eot$/, loader: 'url', query: { limit: 100, name: fontName } },
      { test: /\.svg$/, loader: 'url', query: { limit: 10000, minetype: 'image/svg+xml', name: fontName } }
    ]
  },
  postcss: webpackConfig.postcss,
  externals: webpackConfig.externals,
  resolve: webpackConfig.resolve,
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'static/vendor.[chunkhash:8].js', minChunks: Infinity }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false }),
    new ExtractTextPlugin('static/[name].[chunkhash:8].css', { allChunks: true }),
    new HtmlWebpackPlugin({ template: './template.html', inject: 'body' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
