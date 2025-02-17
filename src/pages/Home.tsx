import { createHighlighter } from 'shiki'
import { Editor } from '@monaco-editor/react'
import { DEFAULT_VALUE } from '@/config/value'
import { shikiToMonaco } from '@shikijs/monaco'
import CopyButton from '@/components/copy-button'
import { SUPPORTED_THEMES } from '@/constants/theme'
import { ModeToggle } from '@/components/mode-toggle'
import LanguageToggle from '@/components/language-toggle'
import { SUPPORTED_LANGUAGES } from '@/constants/language'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'

export default function Home() {
  const { language, theme, setMonaco, setEditor } = useCodeEditorStore()

  return (
    <div className='h-screen flex flex-col'>
      <header className='h-16 flex items-center justify-between p-4 border-b'>
        <LanguageToggle />
        <div className='flex gap-x-2'>
          <CopyButton />
          <ModeToggle />
        </div>
      </header>
      <Editor
        key={language}
        language={language}
        theme={theme}
        defaultValue={DEFAULT_VALUE[language]}
        beforeMount={async (monaco) => {
          const highlighter = await createHighlighter({
            themes: SUPPORTED_THEMES.map(theme => theme.id),
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
