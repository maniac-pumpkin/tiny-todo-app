import { taskGet } from "@/app/actions/task-actions"
import TaskCardWrapper from "@/components/task-card/task-card-wrapper"
import { notFound } from "next/navigation"

type PropsType = { params: Promise<{ name: string }> }

export default async function Page({ params }: PropsType) {
  const { name } = await params
  const tasks = await taskGet()

  const tasksByDirName = tasks.filter(({ dirName }) => dirName === name)

  if (!tasksByDirName.length) notFound()

  return <TaskCardWrapper tasks={tasksByDirName} />
}
