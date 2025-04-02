"use client"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { NutritionSurvey } from "@/components/nutrition-survey"

export default function SurveyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12">
        <ProtectedRoute>
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">OneBite Nutrition Survey</h1>
            <p className="text-muted-foreground">
              Complete this survey to get personalized nutrition recommendations for your athletic goals
            </p>
          </div>
          <NutritionSurvey />
        </ProtectedRoute>
      </main>
    </div>
  )
}

