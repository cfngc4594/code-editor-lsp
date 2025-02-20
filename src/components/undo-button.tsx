import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"

export default function UndoButton() {
  const { editor } = useCodeEditorStore()

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Undo Code"
            onClick={() => {
              editor?.trigger("undo", "undo", null)
            }}
          >
            <Undo2 size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Undo Code</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
