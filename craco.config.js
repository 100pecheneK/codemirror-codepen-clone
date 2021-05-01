const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components/'),
      '@hooks': path.resolve('./src/hooks/'),
    },
  },
}
