"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { CircleSlash2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import BigMessage from "../helpers/big-message"
import TaskCard, { type TaskCardPropsType } from "./task-card-index"

type PropsType = { tasks: TaskCardPropsType[] }

function TaskCardWrapper({ tasks }: PropsType) {
  const searchParams = useSearchParams()

  const renderMode = searchParams.get("renderMode") ?? "grid"
  const sortBy = searchParams.get("sortBy") ?? "Order added"
  const search = searchParams.get("search")

  const wrapperClassName =
    renderMode === "grid"
      ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      : "flex flex-col gap-y-5"

  const sortedTasks = structuredClone(tasks).sort((a, b) => {
    switch (sortBy) {
      case "Order added":
        return a.id - b.id
      case "Earlier first":
        return +new Date(a.deadline) - +new Date(b.deadline)
      case "Later first":
        return +new Date(b.deadline) - +new Date(a.deadline)
      default:
        return a.id - b.id
    }
  })

  const finalData = search
    ? tasks.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
    : sortedTasks

  return (
    <ScrollArea className="h-[calc(100vh-304px)] lg:h-[calc(100vh-236px)]">
      {finalData.length === 0 ? (
        <BigMessage Icon={<CircleSlash2 size={32} />} text="Empty." />
      ) : (
        <div className={wrapperClassName}>
          {finalData.map((task) => (
            <TaskCard key={crypto.randomUUID()} {...task} />
          ))}
        </div>
      )}
    </ScrollArea>
  )
}

export default TaskCardWrapper
