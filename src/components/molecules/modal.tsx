import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import Tooltip from "./tooltip"

interface ModalProps {
  name?: string
  Icon?: LucideIcon
  side?: "left" | "top" | "right" | "bottom"
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  title: string
  description: string
  open?: boolean
  btnStyle?: string
  tooltipContent?: string
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  className?: string
}

export default function Modal({
  name,
  Icon,
  variant,
  size,
  side,
  title,
  description,
  children,
  open,
  tooltipContent,
  setOpen,
  btnStyle,
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {Icon ? (
        <Tooltip contentText={tooltipContent || ""} side={side}>
          <DialogTrigger asChild>
            <Button variant={variant} size={size} className={cn(btnStyle)}>
              <Icon />
            </Button>
          </DialogTrigger>
        </Tooltip>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn("capitalize", btnStyle)}
          >
            {name}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent {...props} className={cn(className)}>
        <DialogTitle className='capitalize'>{title}</DialogTitle>
        <DialogDescription className='capitalize'>
          {description}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
