"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

interface DatePickerProps<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  label: string
}

export function DatePickerField<TFieldValues extends FieldValues>({
  label,
  ...props
}: DatePickerProps<TFieldValues>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-2'>
          <FormLabel className='capitalize'>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-between capitalize", {
                    "text-muted-foreground": !field.value,
                  })}
                >
                  {field.value
                    ? format(field.value, "PPP")
                    : "pilih tanggal..."}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={date =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
