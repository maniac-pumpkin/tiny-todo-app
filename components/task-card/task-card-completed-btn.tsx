"use client"

import { taskComplete } from "@/app/actions/task-actions"
import { startTransition, useOptimistic } from "react"
import { Badge } from "../ui/badge"

type PropsType = {
  id: number
  isCompleted: boolean
}

function TaskCardCompletedBtn({ id, isCompleted }: PropsType) {
  const [completed, setCompleted] = useOptimistic(isCompleted)

  const handleAction = () =>
    startTransition(() => {
      setCompleted((prev) => !prev)
      taskComplete(id, !isCompleted)
    })

  const className = completed ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"
  const innerText = completed ? "Completed" : "Uncompleted"

  return (
    <Badge className={className} onClick={handleAction}>
      {innerText}
    </Badge>
  )
}

export default TaskCardCompletedBtn
