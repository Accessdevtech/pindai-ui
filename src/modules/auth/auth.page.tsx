import AuthCard from "./components/auth-card";
import LoginForm from "./components/login-form";
import { Register } from "./components/register";

export default function AuthPage() {
  return (
    <div className="w-full max-w-sm">
      <AuthCard
        title="Login"
        description="Silahkan login untuk melanjutkan"
        footer={
          <p className="text-muted-foreground capitalize text-sm space-x-2">
            tidak memiliki akun ?<Register />
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
}
