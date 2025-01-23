import { Badge } from "@/components/ui/badge"
import { Status } from "@/interface/type"
import { cn } from "@/lib/utils"

export default function BadgeStatus({
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
