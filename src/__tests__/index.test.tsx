import React from 'react'
import { shallow } from 'enzyme'

import EditorJs from '..'

describe('EditorJs', () => {
  it('renders div container with default holder id', () => {
    const wrapper = shallow(<EditorJs />)
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div id=\\"editorjs\\"></div>"`,
    )
  })

  it('renders custom div container', () => {
    const wrapper = shallow(
      <EditorJs holder="custom-editor">
        <div id="custom-editor" />
      </EditorJs>,
    )
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div id=\\"custom-editor\\"></div>"`,
    )
  })
})
