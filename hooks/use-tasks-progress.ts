import { getCookie } from "@/lib/utils"
import { create } from "zustand/react"

type StateType = {
  progress: number
  refresh: () => Promise<void>
}

const useTasksProgress = create<StateType>((set) => {
  const fetchTasksProgress = async () => {
    try {
      const response = await fetch("/api/tasks/progress", {
        headers: { authorization: `Bearer ${getCookie("token")}` },
      })

      const data: string = await response.text()

      set({ progress: +data })
    } catch {
      set({ progress: 0 })
    }
  }

  fetchTasksProgress()

  return {
    progress: 0,
    refresh: fetchTasksProgress,
  }
})

export default useTasksProgress
