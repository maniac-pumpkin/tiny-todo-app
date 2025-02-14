"use client"

import { getClientAuthToken } from "@/lib/jwt-utils"
import { create } from "zustand/react"

export type DirsType = { id: number; name: string; userId: number }[]

type StateType = {
  directories: DirsType
  refresh: () => Promise<void>
}

const useDirectories = create<StateType>((set) => {
  const fetchDirectories = async () => {
    try {
      const authorization = getClientAuthToken()!

      const response = await fetch("/api/directories", { headers: { authorization } })

      const data: DirsType = await response.json()

      set({ directories: data })
    } catch {
      set({ directories: [] })
    }
  }

  fetchDirectories()

  return {
    directories: [],
    refresh: fetchDirectories,
  }
})

export default useDirectories
