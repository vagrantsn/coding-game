module.exports = ({ config }) => {
  let cssRule = config.module.rules.find(({ test }) => test.test('.css'))
  cssRule.use = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
      },
    },
    'postcss-loader'
  ]

  return config
}
