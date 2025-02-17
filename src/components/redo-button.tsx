import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Redo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"

export default function RedoButton() {
  const { editor } = useCodeEditorStore()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Redo code"
            onClick={() => {
              editor?.trigger("redo", "redo", null)
            }}>
            <Redo2 size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Redo Code</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
