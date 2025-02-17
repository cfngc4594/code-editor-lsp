import { createHighlighter } from 'shiki'
import { Editor } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { SUPPORTED_THEMES } from '@/constants/theme'
import { ModeToggle } from '@/components/mode-toggle'
import LanguageToggle from '@/components/language-toggle'
import { SUPPORTED_LANGUAGES } from '@/constants/language'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'

export default function Home() {
  const { language, theme, setMonaco, setEditor } = useCodeEditorStore()

  return (
    <div className='h-screen flex flex-col'>
      <header className='h-16 flex items-center justify-between p-4 gap-x-2 border-b'>
        <LanguageToggle />
        <ModeToggle />
      </header>
      <Editor
        language={language}
        theme={theme}
        beforeMount={async (monaco) => {
          const highlighter = await createHighlighter({
            themes: [
              ...SUPPORTED_THEMES
            ],
            langs: SUPPORTED_LANGUAGES.map(lang => lang.id)
          })
          shikiToMonaco(highlighter, monaco)
          setMonaco(monaco)
        }}
        onMount={(editor) => setEditor(editor)}
        options={{ minimap: { enabled: false }, automaticLayout: true, padding: { top: 8 } }}
      />
    </div>
  )
}
