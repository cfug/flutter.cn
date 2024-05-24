const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'host-redirect.min.js',
    library: 'hostRedirect',
  },
  mode: 'production',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};