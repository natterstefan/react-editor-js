/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { useRef, useState, MutableRefObject } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import EditorJS from '@editorjs/editorjs'

import data from '../../cypress/fixtures/data'
import Readme from '../../README.md'
import EditorJs from '..'

import { TOOLS } from './config'
import { CustomJs } from './custom-plugin-js'
import { CustomReact, Button } from './custom-plugin-react'

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
  .addDecorator(withKnobs)
  .add('readme', () => <div />, {
    readme: {
      content: Readme,
    },
  })
  .add('default', () => {
    let editorInstance: EditorJS = null

    const onChange = () => {
      action('EditorJs onChange')(editorInstance)
    }

    return (
      <EditorJs
        tools={TOOLS}
        data={data}
        onChange={onChange}
        editorInstance={instance => {
          editorInstance = instance
          action('EditorJs editorInstance')(editorInstance)
          // added to window for cypress testing
          ;(window as any).app = editorInstance
        }}
      />
    )
  })
  .add('controlled EditorJs', () => {
    const reinitializeOnPropsChange = boolean(
      'reinitializeOnPropsChange',
      false,
    )

    const App = () => {
      const [appData, setAppData] = useState(data)
      const editorInstance: MutableRefObject<EditorJS | null> = useRef(null)

      const onSave = async () => {
        if (editorInstance.current) {
          try {
            const outputData = await editorInstance.current.save()
            action('EditorJs onSave')(outputData)
            setAppData(outputData)
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
              editorInstance.current = instance
              action('EditorJs editorInstance')(instance)
            }}
            onChange={onChange}
            reinitializeOnPropsChange={reinitializeOnPropsChange}
          />
        </div>
      )
    }

    return <App />
  })
  .add('controlled App -> Editor -> EditorJs', () => {
    // the ´<App />` renders an `<Editor />` component, which renders `EditorJs`
    const App = () => {
      const [appData, setAppData] = useState(data)

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
      const editorInstance: MutableRefObject<EditorJS | null> = useRef(null)

      const onChangeHandler = async () => {
        if (editorInstance.current) {
          try {
            const outputData = await editorInstance.current.save()
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
              editorInstance.current = instance
              action('EditorJs editorInstance')(instance)
            }}
            onChange={onChangeHandler}
          />
        </div>
      )
    }

    return <App />
  })
  .add('with custom holder', () => {
    const editorInstance: MutableRefObject<EditorJS | null> = useRef(null)

    const onChange = () => {
      action('EditorJs onChange')(editorInstance.current)
    }

    return (
      <EditorJs
        tools={TOOLS}
        data={data}
        onChange={onChange}
        holder="custom-editor-container"
        editorInstance={instance => {
          editorInstance.current = instance
          action('EditorJs editorInstance')(editorInstance)
        }}
      >
        <div id="custom-editor-container" />
      </EditorJs>
    )
  })
  .add('with custom tool (react)', () => {
    const editorInstance: MutableRefObject<EditorJS | null> = useRef(null)

    const customData = {
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
    }

    const onSave = async () => {
      if (editorInstance.current) {
        try {
          const outputData = await editorInstance.current.save()
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
            editorInstance.current = instance
            action('EditorJs editorInstance')(editorInstance)
          }}
        />
      </div>
    )
  })
