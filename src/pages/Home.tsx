import * as monaco from 'monaco-editor'
import { highlighter } from '@/lib/shiki'
import { DEFAULT_VALUE } from '@/config/value'
import { shikiToMonaco } from '@shikijs/monaco'
import CopyButton from '@/components/copy-button'
import RedoButton from '@/components/redo-button'
import UndoButton from '@/components/undo-button'
import ResetButton from '@/components/reset-button'
import FormatButton from '@/components/format-button'
import { Editor, loader } from '@monaco-editor/react'
import { ModeToggle } from '@/components/mode-toggle'
import { CODE_EDITOR_OPTIONS } from '@/constants/option'
import LanguageToggle from '@/components/language-toggle'
import { connectToLanguageServer } from '@/lib/language-server'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'
import { SUPPORTED_LANGUAGE_SERVERS } from '@/config/language-server'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker();
  },
}

loader.config({ monaco })

export default function Home() {
  const { language, theme, setMonaco, setEditor, languageClient, setLanguageClient } = useCodeEditorStore()

  return (
    <div className='h-screen flex flex-col'>
      <header className='h-16 flex items-center justify-between p-4 border-b gap-x-2'>
        <LanguageToggle />
        <div className='flex gap-x-2'>
          <ResetButton />
          <UndoButton />
          <RedoButton />
          <FormatButton />
          <CopyButton />
          <ModeToggle />
        </div>
      </header>
      <Editor
        defaultLanguage={language}
        theme={theme}
        defaultValue={DEFAULT_VALUE[language]}
        beforeMount={(monaco) => {
          shikiToMonaco(highlighter, monaco)
          setMonaco(monaco)
        }}
        onMount={(editor) => {
          setEditor(editor)
          if (languageClient) {
            languageClient.dispose()
            setLanguageClient(null)
          }
          const serverConfig = SUPPORTED_LANGUAGE_SERVERS.find((s) => s.id === language)
          if (serverConfig) {
            connectToLanguageServer(serverConfig);
          }
        }}
        options={CODE_EDITOR_OPTIONS}
        path={`file:///code-${language}`}
      />
    </div>
  )
}
