import { createHighlighter } from 'shiki'
import { Editor } from '@monaco-editor/react'
import { DEFAULT_VALUE } from '@/config/value'
import { shikiToMonaco } from '@shikijs/monaco'
import CopyButton from '@/components/copy-button'
import RedoButton from '@/components/redo-button'
import UndoButton from '@/components/undo-button'
import ResetButton from '@/components/reset-button'
import { SUPPORTED_THEMES } from '@/constants/theme'
import { ModeToggle } from '@/components/mode-toggle'
import { CODE_EDITOR_OPTIONS } from '@/constants/option'
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
          <ResetButton />
          <UndoButton />
          <RedoButton />
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
        options={CODE_EDITOR_OPTIONS}
      />
    </div>
  )
}
