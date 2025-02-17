import { RotateCcw } from "lucide-react"
import { DEFAULT_VALUE } from "@/config/value"
import { Button } from "@/components/ui/button"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ResetButton() {
  const { editor, language } = useCodeEditorStore()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Reset Code"
            onClick={() => {
              if (editor) {
                const value = DEFAULT_VALUE[language]
                const model = editor.getModel()
                if (model) {
                  const fullRange = model.getFullModelRange()
                  editor.executeEdits("reset-code", [
                    {
                      range: fullRange,
                      text: value,
                      forceMoveMarkers: true
                    }
                  ])
                }
              }
            }}>
            <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
