import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface TooltipsProps {
  contentText: string
  children?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export default function Tooltip({
  contentText,
  side,
  children,
}: TooltipsProps) {
  const [open, setOpen] = React.useState(false)
  const isContentText = contentText !== ""
  const handleOpenChange = () => {
    setOpen(prevOpen => (isContentText ? !prevOpen : prevOpen))
  }
  return (
    <ShadcnTooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        className='bg-black text-xs uppercase text-white'
      >
        {contentText}
      </TooltipContent>
    </ShadcnTooltip>
  )
}
