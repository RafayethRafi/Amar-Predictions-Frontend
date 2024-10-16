'use client'

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import useAuth from "@/lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"

// Define validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function LoginForm() {
  const api = process.env.NEXT_PUBLIC_API_URL
  const { login, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data) {
    setLoading(true)
    setAuthError("") // Clear any previous auth errors
  
    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
  
      const res = await response.json()
  
      if (response.status === 403) {
        setAuthError("The email or password is incorrect")
        throw new Error("The email or password is incorrect")
      }
  
      if (!response.ok) {
        // Handle non-200 errors
        const errorMessage = res.detail || "Login failed. Please try again."
        setAuthError(errorMessage)
        throw new Error(errorMessage)
      }
  
      // Fetch user data after successful login
      const userData = await fetch(`${api}/users/me`, {
        headers: {
          Authorization: `Bearer ${res?.token || res?.access_token}`, // Handle different token key names
        },
      })
  
      if (userData.status === 200) {
        const user = await userData.json()
        login(res?.token || res?.access_token, user)
        toast({
          title: "Success",
          description: "Successfully Logged In",
          variant: "success",
        })
        router.push("/")
      } else {
        throw new Error("Failed to fetch user data.")
      }
    } catch (error) {
      setAuthError(error.message || "An error occurred during login.")
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      logout()
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to Amar Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  {...register("email")}
                  placeholder="Enter your Email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.password.message}</AlertDescription>
                  </Alert>
                )}
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
