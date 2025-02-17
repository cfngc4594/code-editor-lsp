import { createHighlighter } from 'shiki'
import { Editor } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { SUPPORTED_THEMES } from '@/constants/theme'
import { ModeToggle } from '@/components/mode-toggle'
import { SUPPORTED_LANGUAGES } from '@/constants/language'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'

export default function Home() {
  const { language, theme, setMonaco, setEditor } = useCodeEditorStore()

  return (
    <div className='relative'>
      <Editor
        language={language}
        theme={theme}
        beforeMount={async (monaco) => {
          const highlighter = await createHighlighter({
            themes: [
              ...SUPPORTED_THEMES
            ],
            langs: [
              ...SUPPORTED_LANGUAGES
            ]
          })
          shikiToMonaco(highlighter, monaco)
          setMonaco(monaco)
        }}
        onMount={(editor) => setEditor(editor)}
        options={{ minimap: { enabled: false } }}
        className='min-h-screen'
      />
      <div className='fixed top-5 right-10'>
        <ModeToggle />
      </div>
    </div>
  )
}
