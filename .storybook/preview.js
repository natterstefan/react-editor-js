import { addDecorator, addParameters } from '@storybook/react'
import { addReadme } from 'storybook-readme'
import { create } from '@storybook/theming/create'

addDecorator(addReadme)

addParameters({
  options: {
    theme: create({
      base: 'light',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    sortStoriesByKind: true,
  },
})
