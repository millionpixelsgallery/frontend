const getConfig = require('../config/webpack.config')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (stConfig, { configType }) => {
    const appConfig = getConfig(configType.toLowerCase())
    const stBabelLoader = stConfig.module.rules[0].use[0]
    stBabelLoader.options.plugins.push([
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
          },
        },
      },
    ])

    stConfig.resolve.modules.push(...appConfig.resolve.modules)
    stConfig.resolve.alias = {
      ...appConfig.resolve.alias,
      ...stConfig.resolve.alias,
    }
    return stConfig
  },
}
