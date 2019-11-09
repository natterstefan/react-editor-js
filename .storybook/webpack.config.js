// https://storybook.js.org/docs/configurations/typescript-config
// alternative: https://github.com/storybookjs/presets/tree/master/packages/preset-typescript
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
