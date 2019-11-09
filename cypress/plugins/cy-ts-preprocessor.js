// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/preprocessors__typescript-webpack
// https://github.com/bahmutov/add-typescript-to-cypress
const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
}

const options = {
  webpackOptions,
}

module.exports = wp(options)
