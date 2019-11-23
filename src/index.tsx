import React, { FunctionComponent, memo, ReactElement, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'

export interface IEditorJsProps extends EditorJS.EditorConfig {
  children?: ReactElement
  // Id of Element that should contain the Editor
  holder?: string
  // reinitialize editor.js when component did update
  reinitializeOnPropsChange?: boolean
  // editorjs instance
  editorInstance?: (instance: EditorJS) => void
}

export type EditorJsProps = Readonly<IEditorJsProps>

const DEFAULT_ID = 'editorjs'

const EditorJs: FunctionComponent<EditorJsProps> = (props): ReactElement => {
  const {
    holder: customHolder,
    editorInstance,
    /* optimise performance */
    reinitializeOnPropsChange,
    /* eslint-disable-next-line */
    children,
    tools,
    ...otherProps
  } = props

  const holder = customHolder || DEFAULT_ID

  useEffect(() => {
    let instance: EditorJS = null

    // initialise the editor with a paragraph and header block already
    instance = new EditorJS({
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        header: Header,
        ...tools,
      },
      holder,
      ...otherProps,
    })

    if (editorInstance) {
      editorInstance(instance)
    }

    return (): void => {
      // destroys the editor
      if (instance && reinitializeOnPropsChange) {
        instance.isReady.then(() => {
          instance.destroy()
          instance = undefined
        })
      }
    }
  }, [
    holder,
    editorInstance,
    otherProps,
    props,
    tools,
    reinitializeOnPropsChange,
  ])

  return (children as ReactElement) || <div id={holder} />
}

export default memo(EditorJs)
