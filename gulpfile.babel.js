/**
 * This is a gulp script with babel parser.
 * please make sure your gulp version >= 3.9.0.
 */

"use strict"
import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevSever from 'webpack-dev-server';

gulp.task('dev', () => {
  let webpackConfig = require('./webpack.config.js');
  let devServerOption = {
    publicPath: webpackConfig.output.publicPath,
    // quiet: true,
    // noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }

  let compiler = webpack(webpackConfig, (err, stats) => {
    let json = stats.toJson();
    if (json.errors.length)
      console.error(json.errors[0])
  })

  let webpackDevServer = new WebpackDevSever(compiler, devServerOption);

  webpackDevServer.listen(8888, '0.0.0.0', err => {
    if(err)
      console.error(err);
    console.info('==> 🚧  Webpack development server listening on %s:%s', '0.0.0.0', 8888);
  })
})