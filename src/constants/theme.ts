export interface ThemeItem {
  id: string
  label: string
}

export const SUPPORTED_THEMES: ThemeItem[] = [
  {
    id: "github-dark-default",
    label: "Github Dark Default"
  },
  {
    id: "github-light-default",
    label: "Github Light Default"
  }
] as const

export type SupportedTheme = (typeof SUPPORTED_THEMES)[number]["id"]
