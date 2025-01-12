import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  return (
    <ShadcnTooltip>
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
