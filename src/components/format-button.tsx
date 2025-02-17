import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { SUPPORTED_LANGUAGE_SERVERS } from "@/config/language-server"

export default function FormatButton() {
  const { editor, language } = useCodeEditorStore()

  const isLanguageSupported = SUPPORTED_LANGUAGE_SERVERS.some(
    (server) => server.id === language
  )

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Format Code"
            disabled={!isLanguageSupported}
            onClick={() => {
              editor?.trigger("format", "editor.action.formatDocument", null)
            }}>
            <Paintbrush size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Format Code</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
