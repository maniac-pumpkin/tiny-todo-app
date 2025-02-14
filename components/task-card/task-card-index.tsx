"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import { isBefore, parseISO } from "date-fns"
import { Calendar } from "lucide-react"
import { memo } from "react"
import TaskCardCompletedBtn from "./task-card-completed-btn"
import TaskCardDeleteBtn from "./task-card-delete-btn"
import TaskCardEditBtn from "./task-card-edit-btn"
import TaskCardImportantBtn from "./task-card-important-btn"

export type TaskCardPropsType = {
  id: number
  title: string
  description: string
  deadline: string
  isImportant: boolean
  isCompleted: boolean
  dirName: string
  createdAt: string
}

function TaskCard(props: TaskCardPropsType) {
  const isOutDated = isBefore(parseISO(props.deadline), new Date())
  const isDone = props.isCompleted

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className={cn("text-base", isDone && "line-through", isOutDated && "text-red-600")}>
          {props.title}
        </CardTitle>
        <Badge>{props.dirName}</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <CardDescription className={cn(isDone && "line-through", isOutDated && "text-red-600")}>
          {props.description}
        </CardDescription>
        <p className={cn("flex items-center gap-x-2 text-sm", isDone && "line-through", isOutDated && "text-red-600")}>
          <Calendar size={16} />
          <span>{formatDate(props.deadline)}</span>
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <TaskCardCompletedBtn id={props.id} isCompleted={props.isCompleted} />
        <div>
          <TaskCardImportantBtn id={props.id} isImportant={props.isImportant} />
          <TaskCardDeleteBtn id={props.id} />
          <TaskCardEditBtn {...props} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default memo(TaskCard)
