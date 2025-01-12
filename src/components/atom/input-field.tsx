import { HTMLInputTypeAttribute } from "react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  type?: HTMLInputTypeAttribute
}

export default function InputField<TFieldValues extends FieldValues>({
  label,
  type = "text",
  ...props
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className='grow'>
          <FormLabel className='font-medium capitalize'>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              type={type}
              {...field}
              value={field.value === null ? "" : field.value}
              autoComplete={type === "password" ? "off" : "on"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
