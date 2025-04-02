"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Save, History } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type ChatSession = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export function AINutritionCoach() {
  const { user } = useAuth()
  const [input, setInput] = useState("")
  const [activeChat, setActiveChat] = useState<ChatSession>({
    id: "current",
    title: "New Conversation",
    messages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your OneBite AI Nutrition Coach. Based on your survey responses, I can provide personalized nutrition advice for your athletic goals. How can I help you today?",
        timestamp: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [savedChats, setSavedChats] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("current")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat.messages])

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedChatsData = localStorage.getItem(`onebite-chats-${user.id}`)
      if (savedChatsData) {
        try {
          const parsedChats = JSON.parse(savedChatsData) as ChatSession[]
          // Convert string dates back to Date objects
          const processedChats = parsedChats.map((chat) => ({
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            messages: chat.messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          }))
          setSavedChats(processedChats)
        } catch (error) {
          console.error("Error parsing saved chats:", error)
        }
      }
    }
  }, [user])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    const updatedMessages = [...activeChat.messages, userMessage]
    setActiveChat({
      ...activeChat,
      messages: updatedMessages,
      updatedAt: new Date(),
    })
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your training intensity, I recommend increasing your protein intake to 1.8-2.0g per kg of body weight to support muscle recovery.",
        "For your endurance training, try consuming 30-60g of carbohydrates per hour during sessions lasting longer than 90 minutes.",
        "Your hydration needs are likely around 3-4 liters per day, but you should increase this by 500-750ml for each hour of intense training.",
        "Pre-workout nutrition should include easily digestible carbs and a moderate amount of protein about 1-2 hours before training.",
        "For recovery, aim to consume a 3:1 ratio of carbohydrates to protein within 30 minutes after your workout.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]

      setActiveChat({
        ...activeChat,
        messages: finalMessages,
        updatedAt: new Date(),
      })
      setIsLoading(false)
    }, 1500)
  }

  const saveCurrentChat = () => {
    if (activeChat.messages.length <= 1) {
      toast({
        title: "Cannot save empty chat",
        description: "Please have a conversation before saving.",
        variant: "destructive",
      })
      return
    }

    // Generate a title from the first user message
    const firstUserMessage = activeChat.messages.find((msg) => msg.role === "user")
    const chatTitle = firstUserMessage
      ? firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? "..." : "")
      : "Nutrition Conversation"

    const newChat: ChatSession = {
      ...activeChat,
      id: Date.now().toString(),
      title: chatTitle,
    }

    const updatedSavedChats = [...savedChats, newChat]
    setSavedChats(updatedSavedChats)

    // Save to localStorage
    if (user) {
      localStorage.setItem(`onebite-chats-${user.id}`, JSON.stringify(updatedSavedChats))
    }

    // Reset current chat
    setActiveChat({
      id: "current",
      title: "New Conversation",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your OneBite AI Nutrition Coach. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    setActiveTab("current")

    toast({
      title: "Conversation saved",
      description: "You can access it in your chat history.",
    })
  }

  const loadSavedChat = (chatId: string) => {
    const selectedChat = savedChats.find((chat) => chat.id === chatId)
    if (selectedChat) {
      setActiveChat(selectedChat)
      setActiveTab(chatId)
    }
  }

  const startNewChat = () => {
    setActiveChat({
      id: "current",
      title: "New Conversation",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your OneBite AI Nutrition Coach. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    setActiveTab("current")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="current" className="data-[state=active]:bg-brand-accent/20">
              Current Chat
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-brand-accent/20">
              Chat History
            </TabsTrigger>
          </TabsList>

          {activeTab === "current" && (
            <Button
              variant="outline"
              size="sm"
              onClick={saveCurrentChat}
              className="text-brand-accent hover:text-brand-accent hover:bg-brand-accent/10"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Conversation
            </Button>
          )}

          {activeTab === "history" && savedChats.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={startNewChat}
              className="text-brand-primary hover:text-brand-primary hover:bg-brand-primary/10"
            >
              Start New Chat
            </Button>
          )}
        </div>

        <TabsContent value="current" className="mt-0">
          <Card className="w-full h-[600px] flex flex-col survey-card shadow-lg border-brand-accent border-t-4">
            <CardHeader className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-brand-accent" />
                OneBite AI Nutrition Coach
              </CardTitle>
              <CardDescription>Get personalized nutrition advice based on your athletic needs</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {activeChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className={message.role === "assistant" ? "bg-brand-primary" : "bg-brand-secondary"}>
                          <AvatarFallback>
                            {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.role === "assistant"
                                ? "bg-muted text-foreground"
                                : "bg-brand-secondary text-white"
                            }`}
                          >
                            {message.content}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(new Date(message.timestamp))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-3">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Ask about nutrition recommendations..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-accent hover:bg-brand-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card className="w-full h-[600px] flex flex-col survey-card shadow-lg border-brand-secondary border-t-4">
            <CardHeader className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-brand-secondary" />
                Chat History
              </CardTitle>
              <CardDescription>View your past conversations with the OneBite AI Nutrition Coach</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full">
                {savedChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <History className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No saved conversations yet</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Your conversations with the AI Nutrition Coach will appear here once you save them.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {savedChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => loadSavedChat(chat.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{chat.title}</h3>
                          <span className="text-xs text-muted-foreground">{formatDate(new Date(chat.createdAt))}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {chat.messages[chat.messages.length - 1].content}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span>{chat.messages.length} messages</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            {savedChats.length > 0 && (
              <CardFooter className="border-t p-3 justify-center">
                <Button
                  variant="outline"
                  onClick={startNewChat}
                  className="text-brand-primary hover:text-brand-primary hover:bg-brand-primary/10"
                >
                  Start New Chat
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

