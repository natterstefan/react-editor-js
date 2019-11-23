/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

type EditorJSAPI = import('@editorjs/editorjs').API

type DataType = {
  component: React.ComponentType<any>
  [k: string]: any
}

export const Button = (props: any) => {
  const { api, data, onChange } = props
  const [counter, setCounter] = useState((data && data.counter) || 0)
  const buttonRef = useRef()

  const onClick = useCallback(() => {
    const newCounter = counter + 1
    setCounter(newCounter)
    onChange({ counter: newCounter })
  }, [counter, onChange])

  useEffect(() => {
    const buttonElement = buttonRef.current

    api.listeners.on(buttonElement, 'click', onClick)

    return () => {
      api.listeners.off(buttonElement, 'click', onClick)
    }
  }, [api.listeners, onClick])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      type="button"
      style={{ padding: 10 }}
    >
      Click me [clicked: {counter} times]
    </button>
  )
}

export class CustomReact {
  private data: DataType = null

  private api: EditorJSAPI = null

  /**
   * Example config:
   *
   * ```js
   * const data = {
   *  blocks: [
   *    {
   *      type: 'customReact',
   *      data: {
   *        component: Button,
   *        counter: 0,
   *      },
   *    },
   *  ]
   * }
   *
   * const tools = { customReact: CustomReact }
   * ```
   */
  constructor({ data, api }: { data: DataType; api: EditorJSAPI }) {
    this.api = api
    this.data = data

    this.onChange = this.onChange.bind(this)
  }

  onChange(data: DataType) {
    this.data = {
      ...data,
      component: this.data.component,
    }
  }

  render() {
    const container = document.createElement('div')
    const Editor = this.data.component

    if (Editor) {
      ReactDOM.render(
        <Editor {...this.data} api={this.api} onChange={this.onChange} />,
        container,
      )
    }

    return container
  }

  save() {
    return this.data
  }
}
