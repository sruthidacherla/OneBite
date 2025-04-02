"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock } from "lucide-react"
import Link from "next/link"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login" && pathname !== "/account") {
      router.push("/login")
    }
  }, [user, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    )
  }

  if (!user && pathname !== "/login" && pathname !== "/account") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md mx-auto survey-card shadow-lg border-brand-primary border-t-4">
          <CardHeader className="bg-brand-light">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-brand-primary/20 p-4">
                <Lock className="h-6 w-6 text-brand-primary" />
              </div>
            </div>
            <CardTitle className="text-center">Authentication Required</CardTitle>
            <CardDescription className="text-center">
              You need to create an account or log in to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-4 text-center">
            <p className="mb-4">
              Please create an account or log in to access all features of NutriAthlete, including personalized surveys
              and AI coaching.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 bg-muted/20 border-t">
            <Link href="/account" className="w-full">
              <Button className="w-full bg-brand-primary hover:bg-brand-dark">Create Account</Button>
            </Link>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

