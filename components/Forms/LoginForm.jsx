"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations/login";
import { useToast } from "../ui/use-toast";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const { login, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data, e) {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("password", data.password);

    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        body: formdata,
      });

      const res = await response.json();

      if (response.ok) {
        const userData = await fetch(`${api}/users/me`, {
          headers: {
            Authorization: `Bearer ${res?.access_token}`,
          },
        });

        if (userData.status === 200) {
          const data = await userData.json();
          login(res?.access_token, data);
          toast({
            title: "Success",
            description: "Successfully Logged In",
            variant: "success",
          });
          router.push("/");
        } else {
          throw new Error("Failed to fetch user data");
        }
      } else {
        throw new Error(res.detail || "Login failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      logout();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {loading ? "Loading..." : "Login to Amar Predictions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => onSubmit(form.getValues(), e)}>
            <div className="space-y-4">
              <Input
                type="text"
                {...form.register("username")}
                placeholder="Username"
              />
              <Input
                type="password"
                {...form.register("password")}
                placeholder="Password"
              />
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
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
  );
}
