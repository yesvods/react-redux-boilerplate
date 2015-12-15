/**
 * This is a gulp script with babel parser.
 * please make sure your gulp version >= 3.9.0.
 */

"use strict"
import gulp from 'gulp';
import webpack from 'webpack';
import express from 'express';
import config from './config';
import path from 'path';

gulp.task('dev', () => {
  let webpackConfig = require('./webpack.config.js');
  let devServerOption = {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }

  let app = express();
  let compiler = webpack(webpackConfig, (err, stats) => {
    let json = stats.toJson();
    if (json.errors.length)
      console.error(json.errors[0])
  });

  app.use(require('webpack-dev-middleware')(compiler, devServerOption));

  app.use(require('webpack-hot-middleware')(compiler));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  app.listen(config.clientPort, config.hot, err => {
    if(err)
      console.error(err);
    console.info(`==> 🚧  Webpack development server listening on %s:%s`, config.host, config.clientPort);
  })
})