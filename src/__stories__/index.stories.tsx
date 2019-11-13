/* eslint-disable class-methods-use-this */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import EditorJS from '@editorjs/editorjs'

import data from '../../cypress/fixtures/data'

import { TOOLS } from './config'
import { CustomJs } from './custom-plugin-js'
import { CustomReact, Button } from './custom-plugin-react'

import EditorJs from '..'

storiesOf('ReactEditorJs', module)
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
  .add('with custom plugins', () => {
    let instance: EditorJS = null

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
      try {
        const outputData = await instance.save()
        action('EditorJs onSave')(outputData)
      } catch (e) {
        action('EditorJs onSave failed')(e)
      }
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
          tools={{ customReact: CustomReact, customJs: CustomJs }}
          data={customData}
          editorInstance={editorInstance => {
            instance = editorInstance
            action('EditorJs editorInstance')(editorInstance)
          }}
        />
      </div>
    )
  })
