"use client"

import { userSignUp } from "@/app/actions/user-actions"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function SignUpPage() {
  const handleAction = async (f: FormData) => {
    const password = f.get("password") as string
    const confirmPassword = f.get("confirm-password") as string

    if (password !== confirmPassword)
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
    else if (await userSignUp(f)) {
      toast({
        title: "Successful",
        description: "Account created successfully, now you can sign in",
      })
      redirect("/sign-in")
    } else
      toast({
        title: "Error",
        description: "Failed to sign up",
        variant: "destructive",
      })
  }

  return (
    <Form action={handleAction}>
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Create an account and get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Label className="block space-y-2">
            <span>Username</span>
            <Input
              type="text"
              placeholder="e.g admin"
              name="username"
              pattern="^[a-z]{3,100}$"
              title="Enter between 3 and 100 lowercase letters with no spaces"
              required
            />
          </Label>
          <Label className="block space-y-2">
            <span>Password</span>
            <Input type="password" placeholder="e.g admin" name="password" minLength={8} required />
          </Label>
          <Label className="block space-y-2">
            <span>Confirm password</span>
            <Input type="password" placeholder="e.g admin" name="confirm-password" minLength={8} required />
          </Label>
          <SubmitButton text="Sign up" />
        </CardContent>
        <CardFooter>
          <p>
            <span>Already have an account?</span>
            <Link href="/sign-in">
              <Button variant="link">Sign in</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Form>
  )
}
