import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function StatusBadge({
  status,
  message,
}: {
  status: string
  message: string
}) {
  return (
    <Badge
      className={cn(
        status === "disetujui" &&
          "bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground",
        status === "ditolak" &&
          "bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground",
      )}
    >
      {message}
    </Badge>
  )
}
