import { create } from 'zustand'
import * as monaco from "monaco-editor"
import { Monaco } from '@monaco-editor/react'
import { DEFAULT_THEME } from '@/config/theme'
import { SupportedTheme } from '@/constants/theme'
import { DEFAULT_LANGUAGE } from '@/config/language'
import { SupportedLanguage } from '@/constants/language'

interface CodeEditorState {
  monaco: Monaco | null;
  editor: monaco.editor.IStandaloneCodeEditor | null;
  language: SupportedLanguage;
  theme: SupportedTheme;
  setMonaco: (monaco: Monaco | null) => void;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
  setLanguage: (language: SupportedLanguage) => void;
  setTheme: (theme: SupportedTheme) => void;
}

export const useCodeEditorStore = create<CodeEditorState>((set) => ({
  monaco: null,
  editor: null,
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
  setMonaco: (monaco) => set({ monaco }),
  setEditor: (editor) => set({ editor }),
  setLanguage: (language) => set({ language: language }),
  setTheme: (theme) => set({ theme: theme })
}))
