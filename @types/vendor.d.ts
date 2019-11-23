declare module '@editorjs/*'

// required for storybook
// inspired by https://github.com/storybookjs/storybook/issues/2883#issuecomment-409839786
declare module '*.md' {
  const value: string
  export default value
}
