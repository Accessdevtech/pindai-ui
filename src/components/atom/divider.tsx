import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function Divider({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className='flex flex-row items-center justify-center gap-4'>
      <Separator className={cn(className, "bg-neutral-300")} />
      <p className='rounded-lg bg-primary/30 px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-widest text-primary'>
        {text}
      </p>
      <Separator className={cn(className, "bg-neutral-300")} />
    </div>
  )
}
