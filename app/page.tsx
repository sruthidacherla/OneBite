"use client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 nutrition-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Optimize Your Athletic Performance with OneBite
                </h1>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                  Get tailored nutrition plans based on your training, goals, and dietary preferences
                </p>
              </div>
              <div className="space-x-4">
                {user ? (
                  <>
                    <Link href="/survey">
                      <Button className="bg-white text-brand-primary hover:bg-gray-100">Take Nutrition Survey</Button>
                    </Link>
                    <Link href="/chat">
                      <Button className="bg-brand-secondary text-white hover:bg-brand-secondary/90">
                        Chat with AI Coach
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/account">
                      <Button className="bg-white text-brand-primary hover:bg-gray-100">Create Account</Button>
                    </Link>
                    <Link href="/login">
                      <Button className="bg-brand-secondary text-white hover:bg-brand-secondary/90">Log In</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-brand-light">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-brand-primary/20 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-primary"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                    <path d="M10 2c1 .5 2 2 2 5"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Personalized Nutrition</h3>
                  <p className="text-muted-foreground">
                    Get nutrition plans tailored to your specific sport, training intensity, and goals
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-brand-secondary/20 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-secondary"
                  >
                    <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"></path>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                    <circle cx="17.5" cy="17.5" r="3.5"></circle>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Nutrition Coach</h3>
                  <p className="text-muted-foreground">
                    Chat with our AI coach for real-time nutrition advice and meal planning
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-brand-accent/20 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-brand-accent"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Performance Tracking</h3>
                  <p className="text-muted-foreground">
                    Track how nutrition changes impact your athletic performance over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!user && (
          <section className="py-12 md:py-16 bg-white border-t">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Create an Account to Get Started</h2>
                  <p className="text-muted-foreground mb-6">
                    Sign up to access our nutrition survey and AI coaching tools. Your personalized nutrition plan is
                    just a few steps away.
                  </p>
                  <Link href="/account">
                    <Button className="bg-brand-primary hover:bg-brand-dark">Create Free Account</Button>
                  </Link>
                </div>
                <div className="bg-brand-light p-6 rounded-lg shadow-md max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">What You'll Get:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-brand-primary mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Personalized nutrition plan based on your athletic goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-brand-primary mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Access to AI nutrition coach for real-time advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-brand-primary mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Performance tracking and nutrition adjustments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 OneBite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

