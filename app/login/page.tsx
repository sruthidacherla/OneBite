import { Header } from "@/components/header"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back to OneBite</h1>
          <p className="text-muted-foreground">Log in to access your personalized nutrition plans and AI coaching</p>
        </div>
        <LoginForm />
      </main>
    </div>
  )
}

