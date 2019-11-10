// https://github.com/panpansh/editorjs-json-to-html/blob/master/js/editorjs-json-to-html.js
import { parse, stringify } from 'himalaya'

interface IElementText {
  type: string
  content: string
}

// IChild can either be IElementText or IHimalaya
// https://github.com/microsoft/TypeScript/issues/3375#issuecomment-108705456
interface IChild extends IElementText, IHimalaya {}

interface IHimalaya {
  type: string
  tagName: string
  attributes: []
  children: IChild[]
}

const HTML_ELEMENTS: { [key: string]: string } = {
  PARAGRAPH: 'p',
  HEADLINE1: 'h1',
  HEADLINE2: 'h2',
  UNORDERED_LIST: 'ul',
  ORDERED_LIST: 'li',
  // these types are only allowed as subelements, not first hirarchy
  MARK: 'mark',
}

const HIMALAYA_TYPES = {
  ELEMENT: 'element',
  TEXT: 'text',
}

const EDITORJS_PLUGINS = {
  HEADER: 'header',
  PARAGRAPH: 'paragraph',
  LIST: 'list',
}

const allowedElements = Object.keys(HTML_ELEMENTS).map(el => HTML_ELEMENTS[el])

const placeholderRegex = new RegExp(/\${{(.*)}}/)

const getPlaceholderFromChildren = (element: IHimalaya): string => {
  const hasPlaceholder =
    element &&
    element.children.find((elm: IChild) => {
      return placeholderRegex.test(elm.content)
    })

  const match =
    hasPlaceholder &&
    hasPlaceholder.content &&
    hasPlaceholder.content.match(placeholderRegex)
  return (match && match.length && match[1].toLowerCase()) || ''
}

const getPlaceholderFromContent = (element: IChild): string => {
  const elementContent = element && element.content
  const match = elementContent && elementContent.match(placeholderRegex)
  return (match && match.length && match[1].toLowerCase()) || ''
}

const getContentFromChildren = (children: IHimalaya['children']): string => {
  if (!children) {
    return ''
  }

  return children
    .map((child: IChild): {} => {
      switch (child.type) {
        case HIMALAYA_TYPES.TEXT:
          return child.content

        case HIMALAYA_TYPES.ELEMENT:
          return stringify([child])

        default:
          return null
      }
    })
    .filter(Boolean)
    .join('')
}

export const htmlToJson = (html: string): {} => {
  let result = null
  const json: [IHimalaya] = parse(html)
  // console.log('👉', json)

  if (json.length) {
    result = json
      .map((element: IHimalaya): {} => {
        if (allowedElements.indexOf(element.tagName) >= 0) {
          switch (element.tagName) {
            case HTML_ELEMENTS.HEADLINE1:
            case HTML_ELEMENTS.HEADLINE2:
              return {
                type: EDITORJS_PLUGINS.HEADER,
                data: {
                  text: getContentFromChildren(element.children),
                  level: element.tagName.slice(1),
                },
              }
            case HTML_ELEMENTS.PARAGRAPH:
              // a paragraph can contain/render a custom content placeholder
              const delimiter = getPlaceholderFromChildren(element)
              if (delimiter) {
                return {
                  type: delimiter,
                  data: {},
                }
              }

              return {
                type: EDITORJS_PLUGINS.PARAGRAPH,
                data: {
                  text: getContentFromChildren(element.children),
                },
              }
            case HTML_ELEMENTS.UNORDERED_LIST:
            case HTML_ELEMENTS.ORDERED_LIST:
              const listItems = element.children || []

              return {
                type: EDITORJS_PLUGINS.LIST,
                data: {
                  style:
                    element.tagName === HTML_ELEMENTS.UNORDERED_LIST
                      ? 'unordered'
                      : 'ordered',
                  items: listItems.map((item: IHimalaya): string =>
                    getContentFromChildren(item.children),
                  ),
                },
              }

            default:
              return null
          }
        } else if (element.type === HIMALAYA_TYPES.TEXT) {
          const type = getPlaceholderFromContent(element as IChild)
          if (type) {
            return {
              type,
              data: {},
            }
          }
        }

        return null
      })
      .filter(Boolean)
  }

  return result
}
