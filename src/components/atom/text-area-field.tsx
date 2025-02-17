import { HTMLInputTypeAttribute } from "react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

interface InputFieldProps<TFieldValues extends FieldValues> {
  label?: string
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  type?: HTMLInputTypeAttribute
}

export default function TextAreaField<TFieldValues extends FieldValues>({
  label,
  type = "text",
  ...props
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='font-medium capitalize'>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
