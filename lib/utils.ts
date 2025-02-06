import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date | string) => format(date, "MMMM dd, yyyy")

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ")

  const cookie = cookies.find((c) => c.startsWith(`${name}=`))

  if (cookie) {
    const value = cookie.split("=")[1]

    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + 24)

    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`

    return decodeURIComponent(value)
  }

  return null
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
