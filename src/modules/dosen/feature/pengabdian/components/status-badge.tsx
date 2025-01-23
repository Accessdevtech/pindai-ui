import Tooltip from "@/components/atom/tooltip"
import { Badge } from "@/components/ui/badge"
import { Status } from "@/interface/type"
import { cn } from "@/lib/utils"
import { CheckIcon, ClockIcon, X } from "lucide-react"

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Tooltip
      contentText={
        status === "accepted"
          ? "Disetujui"
          : status === "pending"
            ? "Diproses"
            : "Ditolak"
      }
    >
      <Badge
        variant='outline'
        className={cn("h-9 w-9", {
          "border-green-500 text-green-500": status === "accepted",
          "border-amber-500 text-amber-500": status === "pending",
          "border-red-500 text-red-500": status === "rejected",
        })}
      >
        {status === "accepted" && <CheckIcon />}
        {status === "pending" && <ClockIcon />}
        {status === "rejected" && <X />}
      </Badge>
    </Tooltip>
  )
}
