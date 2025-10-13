"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
// import { atomDate } from "../dokumen"
import { DatePicker } from "@/components/atom/date-picker"
import { Button } from "@/components/ui/button"
import { FieldConfig, FieldType } from "../type"

interface FieldTemplateProps {
  field: FieldConfig
  // date: Date | undefined
  // setDate: Dispatch<SetStateAction<Date | undefined>>
  updateField: <K extends keyof FieldConfig>(
    id: string,
    key: K,
    value: FieldConfig[K]
  ) => void
  removeField: (id: string) => void
}

export default function FieldTemplate({
  field,
  updateField,
  removeField
}: FieldTemplateProps) {
  return (
    <div className='flex flex-col gap-4 py-2'>
      <div className='rounded-lg border p-4'>
        <div className='flex items-center justify-center gap-2'>
          <div className='w-full space-y-2'>
            <Label>Name</Label>
            <div className='text-sm font-medium'>
              <Input value={field.key} disabled />
            </div>
          </div>

          <div className='w-full space-y-2'>
            <Label>Type</Label>
            <Select
              value={field.type}
              onValueChange={(v: FieldType) => updateField(field.id, "type", v)}
              disabled
            >
              <SelectTrigger>
                <SelectValue placeholder='Choose type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='text'>Text</SelectItem>
                <SelectItem value='number'>Number</SelectItem>
                <SelectItem value='date'>Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='w-full space-y-2 md:col-span-4'>
            <Label>Value</Label>
            {field.type === "date" ? (
              <DatePicker field={field} updateField={updateField} />
            ) : field.type === "number" ? (
              <Input
                type='number'
                inputMode='numeric'
                value={field.value}
                onChange={e => updateField(field.id, "value", e.target.value)}
              />
            ) : (
              <Input
                placeholder='Enter text'
                value={field.value}
                onChange={e => updateField(field.id, "value", e.target.value)}
              />
            )}
          </div>
        </div>

        {!(
          field.key === "no_sk" ||
          field.key === "tanggal_pelaksanaan" ||
          field.key === "tanggal_evaluasi"
        ) && (
          <Button
            type='button'
            onClick={() => removeField(field.id)}
            className='mt-4'
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
