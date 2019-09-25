const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@common': path.resolve(__dirname, 'src/common'),
    },
  },
};
