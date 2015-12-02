var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var imageName = 'images/[name].[ext]'
var fontName = 'fonts/[name].[ext]'

module.exports = {
  devtool: 'eval',
  entry: {
    main: './src/main',
    vendor: [
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, loader: 'babel', include: /src/ },
      { test: /\.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?pack=default', include: /src/ },
      { test: /\.css$/, loader: 'style!css!postcss?pack=default', include: /node_modules/ },
      { test: /\.less$/, loader: 'style!css?importLoaders=1!less', include: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, loader: 'url', query: { limit: 2048, name: imageName } },
      { test: /\.woff$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff', name: fontName } },
      { test: /\.woff2$/, loader: 'url', query: { limit: 100, minetype: 'application/font-woff2', name: fontName } },
      { test: /\.ttf$/, loader: 'url', query: { limit: 100, minetype: 'application/octet-stream', name: fontName } },
      { test: /\.eot$/, loader: 'url', query: { limit: 100, name: fontName } },
      { test: /\.svg$/, loader: 'url', query: { limit: 10000, minetype: 'image/svg+xml', name: fontName } }
    ]
  },
  postcss: function () {
    return {
      default: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
    }
  },
  externals: {
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
    new HtmlWebpackPlugin({ template: './template.html', inject: 'body' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
