const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
   addWebpackAlias({
      _: path.resolve(__dirname, './src/'),
   }),
)
