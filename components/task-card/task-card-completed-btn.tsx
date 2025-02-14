"use client"

import { taskComplete } from "@/app/actions/task-actions"
import useTasksProgress from "@/hooks/use-tasks-progress"
import { cn } from "@/lib/utils"
import { startTransition, useOptimistic } from "react"
import { Badge } from "../ui/badge"

type PropsType = {
  id: number
  isCompleted: boolean
}

function TaskCardCompletedBtn({ id, isCompleted }: PropsType) {
  const [completed, setCompleted] = useOptimistic(isCompleted)
  const refresh = useTasksProgress((state) => state.refresh)

  const handleAction = () =>
    startTransition(async () => {
      setCompleted((prev) => !prev)
      await taskComplete(id, !isCompleted)
      refresh()
    })

  return (
    <Badge
      className={cn("bg-yellow-600 hover:bg-yellow-700", completed && "bg-green-600 hover:bg-green-700")}
      onClick={handleAction}
    >
      {completed ? "Completed" : "Uncompleted"}
    </Badge>
  )
}

export default TaskCardCompletedBtn
