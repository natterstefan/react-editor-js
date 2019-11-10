/* eslint-disable class-methods-use-this */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import EditorJS from '@editorjs/editorjs'

import data from '../../cypress/fixtures/data'

import { TOOLS } from './config'

import EditorJs from '..'

class CustomTool {
  render() {
    return document.createElement('textarea')
  }

  save(textarea: HTMLTextAreaElement) {
    return {
      text: textarea.value,
    }
  }
}

storiesOf('ReactEditorJs', module)
  .add('default', () => {
    let instance: EditorJS = null

    const onSave = async () => {
      // https://editorjs.io/saving-data
      try {
        const outputData = await instance.save()
        action('EditorJs onSave')(outputData)
      } catch (e) {
        action('EditorJs onSave failed')(e)
      }
    }

    const onChange = () => {
      action('EditorJs onChange')(instance)
    }

    return (
      <div>
        <button
          onClick={onSave}
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
        <EditorJs
          tools={TOOLS}
          data={data}
          onChange={onChange}
          editorInstance={editorInstance => {
            instance = editorInstance
            action('EditorJs editorInstance')(editorInstance)
          }}
        />
      </div>
    )
  })
  .add('with custom tool', () => {
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
          type: 'custom',
          data: {
            value: 'Editor.js',
          },
        },
      ],
      version: '2.15.0',
    }

    return (
      <EditorJs
        tools={{ custom: CustomTool }}
        data={customData}
        editorInstance={action('EditorJs editorInstance')}
      />
    )
  })
