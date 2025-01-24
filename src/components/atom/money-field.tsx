"use client"
import { HTMLInputTypeAttribute, useReducer } from "react"
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form" // Shadcn UI import
import { Input } from "../ui/input" // Shandcn UI Input

interface InputFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>
  label: string
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  type?: HTMLInputTypeAttribute
  hint?: string
}

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "IDR",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function MoneyField<TFieldValues extends FieldValues>({
  label,
  type = "text",
  hint,
  ...props
}: InputFieldProps<TFieldValues>) {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(props.form.getValues()[props.name])
    : ""

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "")
    return "Rp " + Number(digits).toLocaleString("id-ID")
  }, initialValue)

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "")
    const realValue = Number(digits)
    realChangeFn(realValue)
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        // field.value = value
        const _change = field.onChange

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={label}
                type='text'
                {...field}
                onChange={ev => {
                  setValue(ev.target.value)
                  handleChange(_change, ev.target.value)
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
