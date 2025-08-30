import { cn } from "@/lib/utils"
import Link from "next/link"
import { HTMLInputTypeAttribute } from "react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { buttonVariants } from "../ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"

interface InputFieldProps<TFieldValues extends FieldValues> {
  label?: string
  control: UseControllerProps<TFieldValues>["control"]
  name: FieldPath<TFieldValues>
  type?: HTMLInputTypeAttribute
  hint?: string
  forgotPassword?: boolean
}

export default function InputField<TFieldValues extends FieldValues>({
  label,
  type = "text",
  hint,
  forgotPassword = false,
  ...props
}: InputFieldProps<TFieldValues>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className='grow'>
          <div className='flex items-center'>
            <FormLabel className='font-medium capitalize'>{label}</FormLabel>
            {forgotPassword && (
              <Link
                href='/forgot-password'
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "ml-auto h-0 p-0"
                )}
              >
                Lupa Password
              </Link>
            )}
          </div>
          <FormControl>
            <Input
              placeholder={label}
              type={type}
              {...field}
              value={field.value === null ? "" : field.value}
              // autoComplete='off'
              autoComplete={type === "password" ? "off" : "on"}
            />
          </FormControl>
          <FormDescription>{hint}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
