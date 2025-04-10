const path = require('path');

module.exports = {
  webpack: {
    alias: {
      styles: path.resolve(__dirname, 'src/assets/styles'),
      components: path.resolve(__dirname, 'src/components'),
      images: path.resolve(__dirname, 'src/assets/images'),
      utils: path.resolve(__dirname, 'src/utils'),
    }
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/assets/styles')]
        }
      }
    }
  }
};
