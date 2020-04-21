# react-editor-js

[![npm version](https://badge.fury.io/js/%40natterstefan%2Freact-editor-js.svg)](https://badge.fury.io/js/%40natterstefan%2Freact-editor-js)
[![Build Status](https://travis-ci.com/natterstefan/react-editor-js.svg?branch=master)](https://travis-ci.com/natterstefan/react-editor-js)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/98a2eaf6-7b36-4136-adbd-38d7d68085b3/deploy-status)](https://app.netlify.com/sites/react-editor-js/deploys)

Unofficial react component for Editor.js ([https://editorjs.io/][1]).

## Demo

You can see [react-editor-js](https://github.com/natterstefan/react-editor-js)
in action on both [codesandbox](https://codesandbox.io/s/react-editor-js-example-m9e49)
and [netlify](https://react-editor-js.netlify.com/).

## Getting started

```sh
npm i @natterstefan/react-editor-js --save

# or
yarn add @natterstefan/react-editor-js
```

## PeerDependencies

You have to install the required peerDependencies (eg. `React >= 16.8`), which
are listed by the command:

```sh
npm info "@natterstefan/react-editor-js@latest" peerDependencies
```

If using npm 5+, use this shortcut:

```sh
npx install-peerdeps --dev @natterstefan/react-editor-js

# or
yarn add @natterstefan/react-editor-js -D --peer
```

## Usage

```jsx
// index.js
import EditorJs from '@natterstefan/react-editor-js'

const App = () => {
  return <EditorJs data={data} />
}
```

Whereas `data` looks similar to this [example](cypress/fixtures/data.ts). It is
based on the example output presented on [editorjs.io][1].

### Configuration

`EditorJs` passes all given props straight to the `editorjs` instance. It is
basically just a wrapper component in React. Take a look at the
[configuration page in the editor.js documentation](https://editorjs.io/configuration)
for more details.

#### Advanced example with callbacks, custom element and instance access

```jsx
// index.js
import EditorJs from '@natterstefan/react-editor-js'

const App = () => {
  const editor = null

  const onReady = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log('Editor.js is ready to work!')
  }

  const onChange = () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Now I know that Editor's content changed!")
  }

  const onSave = async () => {
    // https://editorjs.io/saving-data
    try {
      const outputData = await editor.save()
      console.log('Article data: ', outputData)
    } catch (e) {
      console.log('Saving failed: ', e)
    }
  }

  return (
    <div>
      <button onClick={onSave}>Save</button>
      {/* docs: https://editorjs.io/configuration */}
      <EditorJs
        data={data}
        // will be `editorjs` by default
        holder="custom-editor-container"
        onReady={onReady}
        onChange={onChange}
        editorInstance={editorInstance => {
          // invoked once the editorInstance is ready
          editor = editorInstance
        }}
      >
        <div id="custom-editor-container" />
      </EditorJs>
    </div>
  )
}
```

## Plugins / Tools

If you want to add [more tools](https://editorjs.io/getting-started#tools-installation)
simply pass a `tools` property to the `EditorJs` component:

```jsx
// index.js
import EditorJs from '@natterstefan/react-editor-js'
import Header from '@editorjs/header'

const App = () => {
  return <EditorJs data={data} tools={{ header: Header }} />
}
```

`EditorJs` already comes with a basic config for [@editorjs/paragraph](https://www.npmjs.com/package/@editorjs/paragraph)
and [@editorjs/header](https://www.npmjs.com/package/@editorjs/header). Take a
look on their [Github](https://github.com/editor-js) page to find more available
plugins (or take a look at [the storybook example](src/__stories__/config.ts)).

## Additional Props

| Name                      |   Type    | Default | Description                                                                                                              |
| :------------------------ | :-------: | :-----: | :----------------------------------------------------------------------------------------------------------------------- |
| reinitializeOnPropsChange | `boolean` | `false` | editor-js is initialised again on [componentDidUpdate](https://reactjs.org/docs/react-component.html#componentdidupdate) |

## References

- [Debug GitHub Action with tmate](https://github.com/marketplace/actions/debugging-with-tmate)

## Licence

[MIT](LICENCE)

This project is not affiliated, associated, authorized, endorsed by or in any
way officially connected to EditorJS ([editorjs.io](https://editorjs.io/)).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://twitter.com/natterstefan"><img src="https://avatars2.githubusercontent.com/u/1043668?v=4" width="100px;" alt="Stefan Natter"/><br /><sub><b>Stefan Natter</b></sub></a><br /><a href="https://github.com/natterstefan/react-editor-js/commits?author=natterstefan" title="Code">💻</a> <a href="https://github.com/natterstefan/react-editor-js/commits?author=natterstefan" title="Documentation">📖</a> <a href="#example-natterstefan" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[1]: https://editorjs.io/
