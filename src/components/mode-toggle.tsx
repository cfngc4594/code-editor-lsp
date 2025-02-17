import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "@/components/theme-provider"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const { setTheme: setCodeEditorTheme } = useCodeEditorStore()

  return (
    <div>
      <Toggle
        variant="outline"
        className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
        pressed={theme === "dark"}
        onPressedChange={() => {
          const isDarkMode = theme === "dark"
          setTheme(isDarkMode ? "light" : "dark")
          setCodeEditorTheme(isDarkMode ? "github-light-default" : "github-dark-default")
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  )
}
