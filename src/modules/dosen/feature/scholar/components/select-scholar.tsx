"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { EachUtil } from "@/utils/each-utils"
import { useSetAtom } from "jotai"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { ScholarData } from "../scholar.interface"
import { scholarSearchAtom } from "../state/store"

interface SelectScholarProps<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  label: string
  options: ScholarData[]
}

export default function SelectScholar<TFieldValues extends FieldValues>({
  label,
  name,
  options,
  ...props
}: SelectScholarProps<TFieldValues>) {
  const setValue = useSetAtom(scholarSearchAtom)
  const [open, setOpen] = useState(false)
  return (
    <FormField
      {...props}
      name={name}
      render={({ field }) => (
        <FormItem className='grow'>
          <FormLabel className='capitalize'>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn("w-full justify-between capitalize", {
                    "text-muted-foreground": !field.value,
                  })}
                >
                  {field.value
                    ? field.value
                    : options.length > 0
                      ? options?.find(opt => opt.id === field.value)?.id
                      : `Select ${label}...`}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
              <Command>
                <CommandInput
                  placeholder={`Cari ${label}...`}
                  onValueChange={v => setValue(v)}
                />
                <CommandList>
                  <CommandEmpty className='p-2 text-sm text-muted-foreground'>
                    Data {label} tidak ditemukan.
                  </CommandEmpty>
                  <CommandGroup>
                    <EachUtil
                      of={options}
                      render={(option, index) => (
                        <CommandItem
                          value={option.name}
                          key={index}
                          onSelect={() => {
                            field.onChange(option.id)
                            setOpen(false)
                          }}
                          className='capitalize'
                        >
                          <Check
                            className={cn("opacity-0", {
                              "opacity-100": option.id === field.value,
                            })}
                          />
                          <div className='flex gap-2'>
                            <Avatar>
                              <AvatarImage src={option.photo} alt='avatar' />
                              <AvatarFallback>{option.name}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                              <span className='font-semibold'>
                                {option.name}
                              </span>
                              <span className='font-medium text-muted-foreground'>
                                {option.affiliation}
                              </span>
                              <span className='font-medium text-muted-foreground'>
                                {option.citations}
                              </span>
                            </div>
                          </div>
                        </CommandItem>
                      )}
                    />
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
