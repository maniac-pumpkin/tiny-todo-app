"use client"

import { userSignIn } from "@/app/actions/user-actions"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function SignInPage() {
  const handleAction = async (f: FormData) => {
    if (await userSignIn(f)) {
      toast({
        title: "Success",
        description: "You have successfully signed in",
      })
      redirect("/")
    }

    toast({
      title: "Error",
      description: "Invalid credentials",
      variant: "destructive",
    })
  }

  return (
    <Form action={handleAction}>
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Sign into your account</CardTitle>
          <CardDescription>Use your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Label className="block space-y-2">
            <span>Username</span>
            <Input type="text" placeholder="e.g admin" name="username" required />
          </Label>
          <Label className="block space-y-2">
            <span>Password</span>
            <Input type="password" placeholder="e.g admin" name="password" required />
          </Label>
          <SubmitButton text="Sign in" />
        </CardContent>
        <CardFooter>
          <p>
            <span>Don&apos;t have an account?</span>
            <Link href="/sign-up">
              <Button variant="link">Sign up</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Form>
  )
}
