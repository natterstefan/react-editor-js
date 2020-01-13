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

export interface IEditorJsProps extends EditorJS.EditorConfig {
  children?: ReactElement
  /**
   * Element id where Editor will be append
   * @deprecated property will be removed in next major release, use holder instead
   */
  holderId?: string
  /**
   * Element id where Editor will be append
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

const DEFAULT_ID = 'editorjs'

const EditorJs: FunctionComponent<IEditorJsProps> = (props): ReactElement => {
  const {
    holderId: deprecatedId,
    holder: customHolderId,
    editorInstance,
    reinitializeOnPropsChange,
    children,
    tools,
    ...otherProps
  } = props

  const instance: MutableRefObject<EditorJS> = useRef(null)
  const holderId = deprecatedId || customHolderId || DEFAULT_ID

  const initEditor = useCallback(() => {
    if (!instance.current) {
      instance.current = new EditorJS({
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: Header,
          ...tools,
        },
        holder: holderId,
        ...otherProps,
      })
    }

    if (editorInstance) {
      editorInstance(instance.current)
    }
  }, [editorInstance, holderId, otherProps, tools])

  const destroyEditor = useCallback(async () => {
    if (instance.current) {
      await instance.current.isReady
      instance.current.destroy()
      instance.current = undefined
      return true
    }

    return false
  }, [instance])

  /**
   * initEditor on mount and destroy it on unmount
   */
  useEffect(() => {
    initEditor()
    return (): void => {
      destroyEditor()
    }
  }, []) // eslint-disable-line

  /**
   * when props change and reinitializeOnPropsChange is true, the component will
   * first destroy and then init EditorJS again.
   */
  useEffect(() => {
    if (reinitializeOnPropsChange) {
      destroyEditor().then(initEditor)
    }
  }, [destroyEditor, initEditor, instance, reinitializeOnPropsChange])

  return children || <div id={holderId} />
}

export default memo(EditorJs)
