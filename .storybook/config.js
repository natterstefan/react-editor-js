import { addDecorator, configure } from '@storybook/react'
import { addReadme } from 'storybook-readme'

addDecorator(addReadme)

// automatically import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx?$/), module)
