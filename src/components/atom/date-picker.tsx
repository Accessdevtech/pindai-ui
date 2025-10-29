import { FieldConfig } from "@/modules/dppm/feature/configurasi/dokumen/type"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface DatePickerProps {
  field: FieldConfig
  updateField: <K extends keyof FieldConfig>(
    id: string,
    key: K,
    value: FieldConfig[K]
  ) => void
}

export function DatePicker({ field, updateField }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!field.value}
          className='w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
        >
          <CalendarIcon />
          {field.value
            ? format(new Date(field.value), "d/M/yyy")
            : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={field.value ? new Date(field.value) : undefined}
          onSelect={d =>
            updateField(field.id, "value", d ? (d as Date).toISOString() : "")
          }
        />
      </PopoverContent>
    </Popover>
  )
}
