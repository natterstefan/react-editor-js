import {
  text,
  textWithCode,
  textWithMarker,
  textWithLink,
  textWithList,
} from './test-utils'

import { htmlToJson } from '..'

describe('htmlToJson', () => {
  describe('Header', () => {
    it('returns proper data for headers', () => {
      expect(htmlToJson('<h1>Editor.js</h1><h2>Editor.js</h2>')).toStrictEqual([
        { type: 'header', data: { text: 'Editor.js', level: '1' } },
        { type: 'header', data: { text: 'Editor.js', level: '2' } },
      ])
    })
  })

  describe('Paragraph', () => {
    it('returns proper data', () => {
      expect(htmlToJson(text)).toStrictEqual([
        {
          type: 'paragraph',
          data: {
            text:
              'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
          },
        },
      ])
    })

    it('returns proper data for text with marker', () => {
      expect(htmlToJson(textWithMarker)).toStrictEqual([
        {
          type: 'paragraph',
          data: {
            text:
              "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class='cdx-marker'>workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.",
          },
        },
      ])
    })

    it('returns proper data for text with link', () => {
      expect(htmlToJson(textWithLink)).toStrictEqual([
        {
          type: 'paragraph',
          data: {
            text:
              "There are dozens of <a href='https://github.com/editor-js'>ready-to-use Blocks</a> and the <a href='https://editorjs.io/creating-a-block-tool'>simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.",
          },
        },
      ])
    })

    it('returns proper data for text with code', () => {
      expect(htmlToJson(textWithCode)).toStrictEqual([
        {
          type: 'paragraph',
          data: {
            text:
              "Given data can be used as you want: render with HTML for <code class='inline-code'>Web clients</code>, render natively for <code class='inline-code'>mobile apps</code>, create markup for <code class='inline-code'>Facebook Instant Articles</code> or <code class='inline-code'>Google AMP</code>, generate an <code class='inline-code'>audio version</code> and so on.",
          },
        },
      ])
    })
  })

  describe('List', () => {
    it('returns proper data for lists', () => {
      expect(htmlToJson(textWithList)).toStrictEqual([
        {
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              'It is a block-styled editor',
              'It returns clean data output in JSON',
              'Designed to be extendable and pluggable with a simple API',
            ],
          },
        },
      ])
    })
  })

  describe('Delimiter', () => {
    it('returns proper data for delimiter', () => {
      // eslint-disable-next-line no-template-curly-in-string
      expect(htmlToJson('${{DELIMITER}}')).toStrictEqual([
        {
          type: 'delimiter',
          data: {},
        },
      ])
    })

    it('returns proper data for delimiter in a paragrapoh', () => {
      // eslint-disable-next-line no-template-curly-in-string
      expect(htmlToJson('<p>${{DELIMITER}}</p>')).toStrictEqual([
        {
          type: 'delimiter',
          data: {},
        },
      ])
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('returns proper data for delimiter element html', () => {
      // eslint-disable-next-line no-template-curly-in-string
      expect(
        htmlToJson('<div class="ce-delimiter cdx-block"></div>'),
      ).toStrictEqual([
        {
          type: 'delimiter',
          data: {},
        },
      ])
    })
  })

  describe('Image', () => {
    it.todo('renders proper data')
  })
})
