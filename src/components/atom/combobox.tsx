"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { tahunAkademikAtom } from "@/modules/dosen/feature/penelitian/state/store"
import { useAtom } from "jotai"

export function Combobox({
  options,
}: {
  options: { id: string; name: string }[]
}) {
  const [open, setOpen] = React.useState(false)
  const [tahunAkademik, setTahunAkademik] = useAtom(tahunAkademikAtom)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {tahunAkademik
            ? options.find(item => item.id === tahunAkademik)?.name
            : "Pilih tahun akademik..."}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' className='h-9' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item.id}
                  onSelect={currentValue => {
                    setTahunAkademik(
                      currentValue === tahunAkademik ? "" : currentValue,
                    )
                    setOpen(false)
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      tahunAkademik === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
