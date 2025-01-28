import { Status } from "@/interface/type"
import { EachUtil } from "@/utils/each-utils"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface Props {
  onValueChange: (value: string) => void
  checked: string
  label: string
  status: Status[]
}

export default function FilterStatus({
  onValueChange,
  checked,
  label,
  status,
}: Props) {
  const isChecked = (value: string) => checked === value

  return (
    <div className='space-y-2'>
      <Label className='capitalize'>{label}</Label>
      <RadioGroup className='flex flex-col' onValueChange={onValueChange}>
        <EachUtil
          of={status}
          render={(item, index) => (
            <div key={index} className='flex items-center gap-2'>
              <RadioGroupItem value={item} checked={isChecked(item)} />
              <Label className='capitalize'>
                {item === "accepted"
                  ? "diterima"
                  : item === "pending"
                    ? "diproses"
                    : "ditolak"}
              </Label>
            </div>
          )}
        />
      </RadioGroup>
    </div>
  )
}
