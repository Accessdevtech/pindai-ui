import AuthCard from "./components/auth-card"
import LoginForm from "./components/login-form"
import { Register } from "./components/register"

export default function AuthPage() {
  return (
    <AuthCard
      title='Login'
      description='Silahkan login untuk melanjutkan'
      footer={
        <p className='space-x-2 text-sm capitalize text-muted-foreground'>
          tidak memiliki akun ?<Register />
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
