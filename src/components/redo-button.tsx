import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { Redo2 } from "lucide-react"
  import { Button } from "@/components/ui/button"
  
  export default function RedoButton() {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Redo code">
              <Redo2 size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Redo Code</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  