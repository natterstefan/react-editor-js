type EditorJSAPI = import('@editorjs/editorjs').API

type DataType = {
  counter: number
  [k: string]: any
}

export class CustomJs {
  private data: DataType = null

  constructor(props: { data: DataType; api: EditorJSAPI }) {
    const { data } = props
    this.data = data
  }

  createText() {
    return `Click me [clicked: ${this.data.counter} times]`
  }

  render() {
    const container = document.createElement('div')
    this.data.counter = 0

    const button = document.createElement('button')
    button.id = 'custom-js-button'
    button.style.padding = '10px'
    button.onclick = () => {
      this.data.counter++
      const elem = document.getElementById('custom-js-button')
      elem.innerHTML = this.createText()
    }
    button.innerHTML = this.createText()
    container.appendChild(button)

    return container
  }

  save() {
    return {
      value: this.data.counter,
    }
  }
}
