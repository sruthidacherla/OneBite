"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight } from "lucide-react"

type SurveyQuestion = {
  id: string
  type: "multiple-choice" | "slider" | "open-ended"
  question: string
  description?: string
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
  minLabel?: string
  maxLabel?: string
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: "training-frequency",
    type: "multiple-choice",
    question: "How often do you train each week?",
    description: "This helps us understand your activity level",
    options: [
      { value: "1-2", label: "1-2 times per week" },
      { value: "3-4", label: "3-4 times per week" },
      { value: "5-6", label: "5-6 times per week" },
      { value: "7+", label: "7+ times per week" },
    ],
  },
  {
    id: "training-intensity",
    type: "slider",
    question: "How intense are your typical training sessions?",
    description: "Rate the intensity of your workouts",
    min: 1,
    max: 10,
    step: 1,
    minLabel: "Light",
    maxLabel: "Very Intense",
  },
  {
    id: "sport-type",
    type: "multiple-choice",
    question: "What type of sport or activity do you primarily engage in?",
    options: [
      { value: "endurance", label: "Endurance (running, cycling, swimming)" },
      { value: "strength", label: "Strength/Power (weightlifting, sprinting)" },
      { value: "team", label: "Team Sports (soccer, basketball, etc.)" },
      { value: "mixed", label: "Mixed/CrossFit" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "nutrition-goals",
    type: "multiple-choice",
    question: "What are your primary nutrition goals?",
    description: "Select the option that best describes your current focus",
    options: [
      { value: "performance", label: "Improve athletic performance" },
      { value: "recovery", label: "Enhance recovery between sessions" },
      { value: "weight-loss", label: "Weight loss while maintaining performance" },
      { value: "muscle-gain", label: "Muscle gain/strength increase" },
      { value: "health", label: "Overall health improvement" },
    ],
  },
  {
    id: "dietary-restrictions",
    type: "multiple-choice",
    question: "Do you have any dietary restrictions?",
    options: [
      { value: "none", label: "No restrictions" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "gluten-free", label: "Gluten-free" },
      { value: "dairy-free", label: "Dairy-free" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "meal-frequency",
    type: "multiple-choice",
    question: "How many meals do you typically eat per day?",
    options: [
      { value: "1-2", label: "1-2 meals" },
      { value: "3", label: "3 meals" },
      { value: "4-5", label: "4-5 meals" },
      { value: "6+", label: "6+ meals" },
    ],
  },
  {
    id: "hydration",
    type: "slider",
    question: "How many liters of water do you drink daily?",
    min: 0,
    max: 5,
    step: 0.5,
    minLabel: "< 1L",
    maxLabel: "5L+",
  },
  {
    id: "supplements",
    type: "open-ended",
    question: "What supplements do you currently take, if any?",
    description: "List any supplements you use regularly",
  },
]

export function NutritionSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [completed, setCompleted] = useState(false)

  const question = surveyQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  const handleNextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
      // Here you would typically submit the survey
      console.log("Survey answers:", answers)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [question.id]: value,
    })
  }

  const canProceed = answers[question.id] !== undefined

  if (completed) {
    return (
      <Card className="w-full max-w-3xl mx-auto survey-card shadow-lg border-brand-primary border-t-4">
        <CardHeader className="bg-brand-light">
          <CardTitle className="text-center text-2xl text-brand-dark">Survey Completed!</CardTitle>
          <CardDescription className="text-center">Thank you for completing the nutrition survey</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-brand-primary" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Your personalized nutrition plan is being prepared</h3>
          <p className="text-muted-foreground mb-6">
            Our AI nutrition coach will analyze your responses and create a customized plan for your athletic needs.
          </p>
          <Button className="bg-brand-primary hover:bg-brand-dark" onClick={() => (window.location.href = "/chat")}>
            Talk to AI Nutrition Coach
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-4">
        <Progress value={progress} className="h-2 bg-muted" />
        <p className="text-sm text-muted-foreground mt-1">
          Question {currentQuestion + 1} of {surveyQuestions.length}
        </p>
      </div>

      <Card className="survey-card shadow-lg border-brand-primary border-t-4">
        <CardHeader className="bg-brand-light">
          <CardTitle>{question.question}</CardTitle>
          {question.description && <CardDescription>{question.description}</CardDescription>}
        </CardHeader>
        <CardContent className="pt-6">
          {question.type === "multiple-choice" && (
            <RadioGroup value={answers[question.id]} onValueChange={handleAnswerChange} className="space-y-3">
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "slider" && (
            <div className="space-y-4">
              <Slider
                value={
                  answers[question.id] !== undefined
                    ? [answers[question.id]]
                    : [Math.floor((question.min || 0) + (question.max || 10)) / 2]
                }
                min={question.min}
                max={question.max}
                step={question.step}
                onValueChange={(value) => handleAnswerChange(value[0])}
                className="py-4"
              />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{question.minLabel}</span>
                <span className="text-sm font-medium">
                  {answers[question.id] !== undefined ? answers[question.id] : "-"}
                </span>
                <span className="text-sm text-muted-foreground">{question.maxLabel}</span>
              </div>
            </div>
          )}

          {question.type === "open-ended" && (
            <Textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[120px]"
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={!canProceed} className="bg-brand-primary hover:bg-brand-dark">
            {currentQuestion === surveyQuestions.length - 1 ? "Complete" : "Next"}
            {currentQuestion !== surveyQuestions.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

