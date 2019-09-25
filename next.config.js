const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
  webpack: config => {
    //config.resolve = webpackConfig.resolve;

    return config;
  },
};
