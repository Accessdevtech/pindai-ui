"use client";
import { useState } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EachUtil } from "@/utils/each-utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface SelectFieldProps<TFieldValues extends FieldValues> {
  control: UseControllerProps<TFieldValues>["control"];
  name: FieldPath<TFieldValues>;
  label: string;
  options: { id: string; name: string }[];
}

export default function SelectField<TFieldValues extends FieldValues>({
  label,
  name,
  options,
  ...props
}: SelectFieldProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      {...props}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel className="capitalize">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between capitalize", {
                    "text-muted-foreground": !field.value,
                  })}
                >
                  {field.value
                    ? options?.find((opt) => opt.id === field.value)?.name
                    : `Select ${label}...`}

                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder={`Cari ${label}...`} />
                <CommandList>
                  <CommandEmpty className="p-2 text-muted-foreground text-sm">
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
                            field.onChange(option.id);
                            setOpen(false);
                          }}
                          className="capitalize"
                        >
                          <Check
                            className={cn("opacity-0", {
                              "opacity-100": option.id === field.value,
                            })}
                          />
                          {option.name}
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
  );
}
