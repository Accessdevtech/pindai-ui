import { Form as ShadcnForm } from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  children: React.ReactNode;
  onSubmit?: (data: TFormValues) => void;
}

export default function Form<TFormValues extends FieldValues>({
  form,
  children,
  onSubmit,
}: FormProps<TFormValues>) {
  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className="flex flex-col gap-4 w-full"
      >
        {children}
      </form>
    </ShadcnForm>
  );
}
