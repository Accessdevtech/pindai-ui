import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Status } from "@/modules/dosen/feature/penelitian/penelitian-dosen.interface"

export default function StatusBadge({
  status,
  message,
}: {
  status: Status
  message: string
}) {
  return (
    <Badge
      className={cn(
        status === "accepted" &&
          "bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground",
        status === "rejected" &&
          "bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground",
      )}
    >
      {message}
    </Badge>
  )
}
