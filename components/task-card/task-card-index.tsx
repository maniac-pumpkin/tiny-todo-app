"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"
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
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{props.title}</CardTitle>
        <Badge>{props.dirName}</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <CardDescription>{props.description}</CardDescription>
        <p className="flex items-center gap-x-2 text-sm">
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

export default TaskCard
