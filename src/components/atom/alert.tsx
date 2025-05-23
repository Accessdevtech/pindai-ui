import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Tooltips from "../atom/tooltip"

interface AlertProps {
  open: boolean
  setOpen: (open: boolean) => void
  triggerContent?: string
  tooltipContentText?: string
  title?: string
  description?: string
  side?: "top" | "right" | "bottom" | "left"
  Icon?: LucideIcon
  onClick?: () => void
  className?: string
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function Alert({
  triggerContent,
  tooltipContentText,
  title,
  description,
  side,
  Icon,
  onClick,
  className,
  variant,
  size,
  open,
  setOpen,
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltips contentText={tooltipContentText || ""} side={side}>
        <AlertDialogTrigger asChild>
          <Button variant={variant} size={size} className={cn(className)}>
            {triggerContent ? triggerContent : Icon && <Icon />}
          </Button>
        </AlertDialogTrigger>
      </Tooltips>
      <AlertDialogContent>
        <AlertDialogTitle className='capitalize'>{title}</AlertDialogTitle>
        <AlertDialogDescription className='capitalize'>
          {description}
        </AlertDialogDescription>
        <div className='flex justify-end gap-2'>
          <AlertDialogAction onClick={onClick}>Hapus</AlertDialogAction>
          <AlertDialogCancel className='border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-foreground'>
            Batal
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
