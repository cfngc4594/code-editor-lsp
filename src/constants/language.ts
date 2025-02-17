export const SUPPORTED_LANGUAGES = [
  "c",
  "cpp",
  "java"
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]
