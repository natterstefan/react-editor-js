/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: 'reacteditorjs.js',
    library: 'ReactEditorJs',
    libraryTarget: 'umd',
    path: resolve(__dirname, './dist'),
  },
  // https://github.com/TypeStrong/ts-loader#devtool--sourcemaps
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        // https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments
        extractComments: true,
        // https://github.com/webpack-contrib/terser-webpack-plugin#sourcemap
        sourceMap: true,
      }),
    ],
  },
  externals: [
    'react',
    '@editorjs/editorjs',
    '@editorjs/checklist',
    '@editorjs/code',
    '@editorjs/delimiter',
    '@editorjs/editorjs',
    '@editorjs/embed',
    '@editorjs/header',
    '@editorjs/image',
    '@editorjs/inline-code',
    '@editorjs/link',
    '@editorjs/list',
    '@editorjs/marker',
    '@editorjs/paragraph',
    '@editorjs/quote',
    '@editorjs/raw',
    '@editorjs/simple-image',
    '@editorjs/table',
    '@editorjs/warning',
  ],
}
