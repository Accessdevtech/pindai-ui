"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useAuthContext } from "@/contexts/auth-context";

export default function LoginForm() {
  const { login } = useAuthContext();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    await login(data);
  };
  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField
        label="email"
        type="email"
        name="email"
        control={form.control}
      />
      <InputField
        label="password"
        type="password"
        name="password"
        control={form.control}
      />

      <Button type="submit" className="" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Mengirim..." : "Masuk"}
      </Button>
    </Form>
  );
}
