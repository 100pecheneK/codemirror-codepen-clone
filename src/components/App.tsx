import React, { useEffect, useState } from 'react'
import Editor from '@components/Editor'
import useLocalStorage from '@hooks/useLocalStorage'


function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [javaScript, setJavaScript] = useLocalStorage('javaScript', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Document</title>
        </head>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javaScript}</script>
        </html>
      `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, javaScript])

  return (
    <>
      <div className='pane top-pane'>
        <Editor
          value={html}
          onChange={setHtml}
          displayName='HTML'
          language='xml'
        />
        <Editor
          value={css}
          onChange={setCss}
          displayName='CSS'
          language='css'
        />
        <Editor
          value={javaScript}
          onChange={setJavaScript}
          displayName='JavaScript'
          language='javascript'
        />
      </div>
      <div className='pane'>
        <iframe
          title='output'
          sandbox='allow-scripts'
          frameBorder='0'
          width='100%'
          height='100%'
          srcDoc={srcDoc}
        />
      </div>
    </>
  )
}

export default App
