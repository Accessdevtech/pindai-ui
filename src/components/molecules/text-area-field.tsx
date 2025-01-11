import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";
import { Textarea } from "../ui/textarea";

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string;
  control: UseControllerProps<TFieldValues>["control"];
  name: FieldPath<TFieldValues>;
  type?: HTMLInputTypeAttribute;
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
          <FormLabel className="capitalize font-medium">{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
