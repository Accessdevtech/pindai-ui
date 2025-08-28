import Tooltip from "@/components/atom/tooltip"
import { Badge } from "@/components/ui/badge"
import { Status } from "@/interface/type"
import { cn } from "@/lib/utils"
import { CheckIcon, ClockIcon, Undo2Icon, X } from "lucide-react"

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Tooltip
      contentText={
        status === "accepted"
          ? "Disetujui"
          : status === "pending"
            ? "Diproses"
            : status === "returned"
              ? "Dikembalikan"
              : "Ditolak"
      }
    >
      <Badge
        variant='outline'
        className={cn("h-9 w-9", {
          "border-green-500 text-green-500": status === "accepted",
          "border-yellow-500 text-yellow-500": status === "returned",
          "border-gray-600 text-gray-600": status === "pending",
          "border-red-500 text-red-500": status === "rejected"
        })}
      >
        {status === "accepted" && <CheckIcon />}
        {status === "returned" && <Undo2Icon />}
        {status === "pending" && <ClockIcon />}
        {status === "rejected" && <X />}
      </Badge>
    </Tooltip>
  )
}
