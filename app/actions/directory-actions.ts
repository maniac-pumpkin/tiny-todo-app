"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const BASE_URL = process.env["NEXT_PUBLIC_BASE_URL"]!

export const directoryCreate = async (f: FormData) => {
  const name = f.get("dir-name") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories`, {
    method: "POST",
    headers: { authorization: value },
    body: JSON.stringify({ name }),
  })

  return response.ok
}

export const directoryEdit = async (f: FormData, id: number) => {
  const name = f.get("dir-name") as string

  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories/${id}`, {
    method: "PUT",
    headers: { authorization: value },
    body: JSON.stringify({ name }),
  })

  revalidateTag("tasks")

  return response.ok
}

export const directoryDelete = async (id: number) => {
  const cookie = await cookies()
  const { value } = cookie.get("token")!

  const response = await fetch(`${BASE_URL}/api/directories/${id}`, {
    method: "DELETE",
    headers: { authorization: value },
  })

  revalidateTag("tasks")

  return response.ok
}
