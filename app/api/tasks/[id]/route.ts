import db from "@/app/api/db"
import { tasks } from "@/app/api/db/schema"
import { taskBodySchema } from "@/app/api/zod-schema"
import { parseISO } from "date-fns"
import { eq, sql } from "drizzle-orm"

type PropsType = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: PropsType) {
  try {
    const dirId = +(await params).id
    const body = taskBodySchema.parse(await req.json())

    const [createdTask] = await db
      .insert(tasks)
      .values({
        title: body.title,
        description: body.description,
        deadline: parseISO(body.deadline),
        isCompleted: body.isCompleted,
        isImportant: body.isImportant,
        directoryId: dirId,
      })
      .returning()

    return Response.json(createdTask, { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function PUT(req: Request, { params }: PropsType) {
  try {
    const taskId = +(await params).id
    const body = taskBodySchema.partial().parse(await req.json())

    const [updatedTask] = await db
      .update(tasks)
      .set({
        title: body.title ?? sql`${tasks.title}`,
        description: body.description ?? sql`${tasks.description}`,
        deadline: body.deadline ? parseISO(body.deadline) : sql`${tasks.deadline}`,
        isCompleted: body.isCompleted ?? sql`${tasks.isCompleted}`,
        isImportant: body.isImportant ?? sql`${tasks.isImportant}`,
        directoryId: sql`${tasks.directoryId}`,
      })
      .where(eq(tasks.id, taskId))
      .returning()

    return Response.json(updatedTask, { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}

export async function DELETE(_: unknown, { params }: PropsType) {
  try {
    const taskId = +(await params).id

    const [deletedTask] = await db.delete(tasks).where(eq(tasks.id, taskId)).returning()

    return Response.json(deletedTask, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
