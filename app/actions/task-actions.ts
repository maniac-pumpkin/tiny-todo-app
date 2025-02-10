"use server"

import env from "@/lib/env"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE_URL = env.NEXT_PUBLIC_BASE_URL

export const taskGet = async () => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks`, {
    headers: { authorization: value },
    next: { tags: ["tasks"] },
  })

  if (!response.ok) return []

  return response.json() as Promise<
    {
      id: number
      title: string
      description: string
      deadline: string
      isImportant: boolean
      isCompleted: boolean
      dirName: string
      createdAt: string
    }[]
  >
}

export const taskCreate = async (f: FormData) => {
  const title = f.get("title") as string
  const deadline = f.get("deadline") as string
  const description = f.get("description") as string
  const dirId = f.get("dir-id") as string
  const isImportant = f.get("is-important") as string | null
  const isCompleted = f.get("is-completed") as string | null

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${dirId}`, {
    method: "POST",
    headers: { authorization: value },
    body: JSON.stringify({
      title,
      description,
      deadline,
      isImportant: isImportant === "on",
      isCompleted: isCompleted === "on",
    }),
  })

  revalidateTag("tasks")

  return response.ok
}

export const taskEdit = async (id: number, f: FormData) => {
  const title = f.get("title") as string
  const deadline = f.get("deadline") as string
  const description = f.get("description") as string
  const isImportant = f.get("is-important") as string | null
  const isCompleted = f.get("is-completed") as string | null

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { authorization: value },
    body: JSON.stringify({
      title,
      description,
      deadline,
      isImportant: isImportant === "on",
      isCompleted: isCompleted === "on",
    }),
  })

  revalidateTag("tasks")

  return response.ok
}

export const taskComplete = async (id: number, isCompleted: boolean) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { authorization: value },
    body: JSON.stringify({
      isCompleted,
    }),
  })

  revalidateTag("tasks")

  return response.ok
}

export const taskImportant = async (id: number, isImportant: boolean) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { authorization: value },
    body: JSON.stringify({
      isImportant,
    }),
  })

  revalidateTag("tasks")

  return response.ok
}

export const taskDelete = async (id: number) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: { authorization: value },
  })

  revalidateTag("tasks")

  return response.ok
}
