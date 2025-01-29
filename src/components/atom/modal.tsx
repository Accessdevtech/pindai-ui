import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { useState } from "react"
import Tooltip from "../atom/tooltip"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

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
  description?: string
  open?: boolean
  btnStyle?: string
  tooltipContent?: string
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  className?: string
  disabled?: boolean
  preventAutoClose?: boolean
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
  disabled,
  preventAutoClose = false,
  ...props
}: ModalProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)
  const handleOpenChange = (newOpen: boolean) => {
    if (!preventAutoClose || newOpen) {
      setInternalOpen(newOpen)
      setOpen?.(newOpen)
    }
  }
  return (
    <Dialog
      open={preventAutoClose ? internalOpen : open}
      onOpenChange={handleOpenChange}
    >
      {Icon ? (
        <Tooltip contentText={tooltipContent || ""} side={side}>
          <DialogTrigger asChild>
            <Button
              variant={variant}
              size={size}
              className={cn(btnStyle)}
              disabled={disabled}
            >
              <Icon /> {name ? name : null}
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
      <DialogContent {...props} className={cn("max-w-2xl", className)}>
        <DialogTitle className='capitalize'>{title}</DialogTitle>
        <DialogDescription className='capitalize'>
          {description}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
