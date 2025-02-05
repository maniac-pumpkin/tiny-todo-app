import { getCookie } from "./utils"

export const userGetUsername = async () => {
  const response = await fetch("/api/users", {
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
    },
  })

  if (!response.ok) return ""

  return response.text()
}

export const directoryGet = async () => {
  const response = await fetch("/api/directories", {
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
    },
  })

  return response.json() as Promise<
    {
      id: number
      name: string
      userId: number
    }[]
  >
}
