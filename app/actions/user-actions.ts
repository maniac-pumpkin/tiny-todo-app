"use server"

import env from "@/lib/env"
import { cookies } from "next/headers"

const BASE_URL = env.NEXT_PUBLIC_BASE_URL

export const userSignIn = async (f: FormData) => {
  const username = f.get("username") as string
  const password = f.get("password") as string

  const response = await fetch(`${BASE_URL}/api/users/sign-in`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) return false

  const jwToken = await response.text()

  const cookie = await cookies()

  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 24)

  cookie.set("token", jwToken, { expires: expirationDate })

  return true
}

export const userSignUp = async (f: FormData) => {
  const username = f.get("username") as string
  const password = f.get("password") as string

  const response = await fetch(`${BASE_URL}/api/users/sign-up`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })

  return response.ok
}

export const userUpdateCredits = async (f: FormData) => {
  const username = f.get("username") as string
  const prevPassword = f.get("prev-password") as string
  const newPassword = f.get("new-password") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "PUT",
    headers: { authorization: value },
    body: JSON.stringify({
      username: username || null,
      prevPassword: prevPassword || null,
      newPassword: newPassword || null,
    }),
  })

  return response.ok
}

export const userDeleteAcc = async () => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "DELETE",
    headers: { authorization: value },
  })

  return response.ok
}
