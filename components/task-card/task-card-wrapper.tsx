"use client"

import useFiltering from "@/hooks/use-filtering"
import { cn } from "@/lib/utils"
import { compareAsc, compareDesc } from "date-fns"
import { CircleSlash2 } from "lucide-react"
import dynamic from "next/dynamic"
import BigMessage from "../helpers/big-message"
import { ScrollArea } from "../ui/scroll-area"
import type { TaskCardPropsType } from "./task-card-index"

const TaskCard = dynamic(() => import("./task-card-index"), { ssr: false })

type PropsType = { tasks: TaskCardPropsType[] }

function TaskCardWrapper({ tasks }: PropsType) {
  const renderMode = useFiltering((state) => state.renderMode)
  const sortBy = useFiltering((state) => state.sortBy)
  const search = useFiltering((state) => state.search)

  const sortedTasks = structuredClone(tasks).sort((a, b) => {
    switch (sortBy) {
      case "Order added":
        return a.id - b.id
      case "Earlier first":
        return compareAsc(new Date(a.deadline), new Date(b.deadline))
      case "Later first":
        return compareDesc(new Date(a.deadline), new Date(b.deadline))
    }
  })

  const finalData = search
    ? sortedTasks.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
    : sortedTasks

  return (
    <ScrollArea className="h-[calc(100vh-304px)] lg:h-[calc(100vh-236px)]">
      {finalData.length === 0 ? (
        <BigMessage Icon={<CircleSlash2 size={32} />} text="Empty." />
      ) : (
        <section
          className={cn(
            renderMode === "grid" && "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
            renderMode === "list" && "flex flex-col gap-y-5",
          )}
        >
          {finalData.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </section>
      )}
    </ScrollArea>
  )
}

export default TaskCardWrapper
