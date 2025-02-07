import { getCookie } from "@/lib/utils"
import { create } from "zustand/react"

export type DirsType = { id: number; name: string; userId: number }[]

type StateType = {
  directories: DirsType | null
  refresh: () => Promise<void>
}

const useDirectories = create<StateType>((set) => {
  const fetchDirectories = async () => {
    try {
      const response = await fetch("/api/directories", {
        headers: { authorization: `Bearer ${getCookie("token")}` },
      })
      const data: DirsType = await response.json()
      set({ directories: data })
    } catch {
      set({ directories: null })
    }
  }

  fetchDirectories()

  return {
    directories: null,
    refresh: fetchDirectories,
  }
})

export default useDirectories
