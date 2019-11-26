import React, {
  FunctionComponent,
  memo,
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'

export interface IEditorJsProps {
  children?: ReactElement
  /**
   * Id of Element that should contain the Editor
   */
  holder?: string
  /**
   * reinitialize editor.js when component did update
   */
  reinitializeOnPropsChange?: boolean
  /**
   * returns the editorjs instance
   */
  editorInstance?: (instance: EditorJS) => void
}

export type Props = Readonly<EditorJS.EditorConfig> & Readonly<IEditorJsProps>

const DEFAULT_ID = 'editorjs'

const EditorJs: FunctionComponent<Props> = (props): ReactElement => {
  const {
    holder: customHolder,
    editorInstance,
    reinitializeOnPropsChange,
    children,
    tools,
    ...otherProps
  } = props

  const instance: MutableRefObject<EditorJS> = useRef(null)
  const holder = customHolder || DEFAULT_ID

  const initEditor = useCallback(() => {
    if (instance && !instance.current) {
      instance.current = new EditorJS({
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
    }

    if (editorInstance) {
      editorInstance(instance.current)
    }
  }, [editorInstance, holder, otherProps, tools])

  useEffect(() => {
    initEditor()

    return (): void => {
      if (instance.current && reinitializeOnPropsChange) {
        instance.current.isReady.then(() => {
          instance.current.destroy()
          instance.current = undefined

          initEditor()
        })
      }
    }
  }, [initEditor, reinitializeOnPropsChange])

  return (children as ReactElement) || <div id={holder} />
}

export default memo(EditorJs)
