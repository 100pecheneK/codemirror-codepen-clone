import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Editor as EditorType, EditorChange } from 'codemirror'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { Controlled } from 'react-codemirror2'
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
// import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/keymap/vim'
// import 'codemirror/keymap/sublime'

emmet(CodeMirror)
type EditorProps = {
  displayName: string
  language: string
  value: string
  onChange: (value: string) => void
}

export default function Editor({
  displayName,
  language,
  value,
  onChange,
}: EditorProps) {
  const [open, setOpen] = useState(true)
  function handleChange(editor: EditorType, data: EditorChange, value: string) {
    onChange(value)
  }
  return (
    <div
      className={`editor-container ${
        open ? '' : 'editor-container--collapsed'
      }`}
    >
      <div className='editor-title'>
        {displayName}{' '}
        <button
          type='button'
          className='expend-collapse-btn'
          onClick={() => setOpen(p => !p)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className='code-mirror-wrapper'
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,

          lineNumbers: true,
          theme: 'material',
          extraKeys: {
            Tab: 'emmetExpandAbbreviation',
            Enter: 'emmetInsertLineBreak',
          },
          keyMap: 'vim',
          smartIndent: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoCloseTags: true,
          //@ts-ignore
          matchBrackets: true,
          autoCloseBrackets: true,
        }}
      />
    </div>
  )
}
