import { COriginal, CplusplusOriginal, JavaOriginal } from 'devicons-react'

export const SUPPORTED_LANGUAGES = [
  {
    id: "c",
    label: "C",
    icon: <COriginal size={16} aria-hidden="true" />
  },
  {
    id: "cpp",
    label: "C++",
    icon: <CplusplusOriginal size={16} aria-hidden="true" />,
  },
  {
    id: "java",
    label: "Java",
    icon: <JavaOriginal size={16} aria-hidden="true" />,
  },
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["id"]
