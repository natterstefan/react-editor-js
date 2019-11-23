/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import EditorJS from '@editorjs/editorjs'

import data from '../../cypress/fixtures/data'
import Readme from '../../README.md'

import { TOOLS } from './config'
import { CustomJs } from './custom-plugin-js'
import { CustomReact, Button } from './custom-plugin-react'

import EditorJs from '..'

const SaveButton = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}) => (
  <button
    onClick={onClick}
    type="button"
    style={{
      cursor: 'pointer',
      outline: 'none',
      background: 'lightgray',
      border: 0,
      display: 'flex',
      margin: '0 auto',
      padding: '5px 10px',
      borderRadius: 5,
    }}
  >
    SAVE
  </button>
)

storiesOf('ReactEditorJs', module)
  .add('readme', () => <div />, {
    readme: {
      content: Readme,
    },
  })
  .add('default', () => {
    let instance: EditorJS = null

    const onChange = () => {
      action('EditorJs onChange')(instance)
    }

    return (
      <EditorJs
        tools={TOOLS}
        data={data}
        onChange={onChange}
        editorInstance={editorInstance => {
          instance = editorInstance
          action('EditorJs editorInstance')(editorInstance)
        }}
      />
    )
  })
  .add('controlled EditorJs', () => {
    const App = () => {
      const [appData, setAppData] = React.useState(data)
      let editorInstance: EditorJS = null

      const onSave = async () => {
        if (editorInstance) {
          try {
            const outputData = await editorInstance.save()
            action('EditorJs onSave')(outputData)
            setAppData(appData)
          } catch (error) {
            action('EditorJs was not able to save data')(error)
          }
        }
      }

      const onChange = () => {
        action('EditorJs onChange')
        onSave()
      }

      return (
        <div>
          <SaveButton onClick={onSave} />
          <EditorJs
            tools={TOOLS}
            data={appData}
            editorInstance={instance => {
              editorInstance = instance
              action('EditorJs editorInstance')(instance)
            }}
            onChange={onChange}
          />
        </div>
      )
    }

    return <App />
  })
  .add('controlled App -> Editor -> EditorJs', () => {
    // the ´<App />` renders an `<Editor />` component, which renders `EditorJs`
    const App = () => {
      const [appData, setAppData] = React.useState(data)

      const onChange = (newAppData: any) => {
        setAppData(newAppData)
      }

      return <Editor appData={appData} onChange={onChange} />
    }

    const Editor = ({
      appData,
      onChange,
    }: {
      appData: any
      onChange: (data: any) => void
    }) => {
      let editorInstance: EditorJS = null

      const onChangeHandler = async () => {
        if (editorInstance) {
          try {
            const outputData = await editorInstance.save()
            action('EditorJs onSave')(outputData)
            onChange(outputData)
          } catch (error) {
            action('EditorJs was not able to save data')(error)
          }
        }
      }

      return (
        <div>
          <SaveButton onClick={onChangeHandler} />
          <EditorJs
            tools={TOOLS}
            data={appData}
            editorInstance={instance => {
              editorInstance = instance
              action('EditorJs editorInstance')(instance)
            }}
            // reinitializeOnPropsChange
            onChange={onChangeHandler}
          />
        </div>
      )
    }

    return <App />
  })
  .add('with custom tool (react)', () => {
    let editorInstance: EditorJS = null

    const customData = {
      time: new Date().getTime(),
      blocks: [
        {
          type: 'header',
          data: {
            text: 'Editor.js',
            level: 1,
          },
        },
        {
          type: 'header',
          data: {
            text: 'CustomReact Plugin',
            level: 2,
          },
        },
        {
          type: 'customReact',
          data: {
            component: Button,
          },
        },
        {
          type: 'header',
          data: {
            text: 'CustomJS Plugin',
            level: 2,
          },
        },
        {
          type: 'customJs',
          data: {},
        },
      ],
      version: '2.15.0',
    }

    const onSave = async () => {
      if (editorInstance) {
        try {
          const outputData = await editorInstance.save()
          action('EditorJs onSave')(outputData)
        } catch (e) {
          action('EditorJs onSave failed')(e)
        }
      }
    }

    return (
      <div>
        <SaveButton onClick={onSave} />
        <EditorJs
          tools={{ customReact: CustomReact, customJs: CustomJs }}
          data={customData}
          editorInstance={instance => {
            editorInstance = instance
            action('EditorJs editorInstance')(editorInstance)
          }}
        />
      </div>
    )
  })
