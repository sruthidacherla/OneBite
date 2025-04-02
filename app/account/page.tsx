import { Header } from "@/components/header"
import { AccountCreation } from "@/components/account-creation"

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Your OneBite Account</h1>
          <p className="text-muted-foreground">Join OneBite to access personalized nutrition plans and AI coaching</p>
        </div>
        <AccountCreation />
      </main>
    </div>
  )
}

