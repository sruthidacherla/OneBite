"use client"
import { Header } from "@/components/header"
import { AINutritionCoach } from "@/components/ai-nutrition-coach"
import { ProtectedRoute } from "@/components/protected-route"

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <ProtectedRoute>
          <div className="max-w-5xl mx-auto mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">OneBite AI Nutrition Coach</h1>
            <p className="text-muted-foreground">
              Chat with our AI coach for personalized nutrition advice based on your athletic profile
            </p>
          </div>
          <AINutritionCoach />
        </ProtectedRoute>
      </main>
    </div>
  )
}

