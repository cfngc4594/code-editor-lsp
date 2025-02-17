export const SUPPORTED_THEMES = [
  "github-dark-default",
  "github-light-default"
] as const

export type SupportedTheme = typeof SUPPORTED_THEMES[number]
