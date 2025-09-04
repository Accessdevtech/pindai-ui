import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { HTMLInputTypeAttribute, useState } from "react"
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form"
import { Button, buttonVariants } from "../ui/button"
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
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => setShowPassword(!showPassword)
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
          <div className='relative'>
            <FormControl>
              <Input
                placeholder={label}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                {...field}
                value={field.value === null ? "" : field.value}
                // autoComplete='off'
                autoComplete={type === "password" ? "off" : "on"}
              />
            </FormControl>
            {type === "password" && (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-0 top-0 z-10'
                onClick={toggleShowPassword}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            )}
          </div>
          <FormDescription>{hint}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
