import webpack from 'webpack'
import path from 'path'
import config from './config';
import pathResolve from './path-resolve.js';


module.exports = {
  entry: {
    bundle: [
      `webpack-hot-middleware/client?http://${config.host}:${config.clientPort}`,
      './src/entry.js',
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: `/build/`,
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    alias: pathResolve.alias,
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {test: /\.json$/, loader: 'json'},
      { test: /\.s[c|a]ss$/, loader: 'style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!sass'},
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin(pathResolve.globalDependencies)
  ]
}
