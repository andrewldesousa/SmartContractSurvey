require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
    return config;
  },
};
