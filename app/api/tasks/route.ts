import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"
import db from "../db"
import { directories, tasks } from "../db/schema"

export async function GET(req: NextRequest) {
  try {
    const userId = +req.headers.get("userId")!
    const offset = req.nextUrl.searchParams.get("offset")
    const limit = req.nextUrl.searchParams.get("limit")

    const tasksByUser = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        deadline: tasks.deadline,
        isImportant: tasks.isImportant,
        isCompleted: tasks.isCompleted,
        dirName: directories.name,
        createdAt: tasks.createdAt,
      })
      .from(tasks)
      .innerJoin(directories, eq(tasks.directoryId, directories.id))
      .where(eq(directories.userId, userId))
      .offset(Number(offset || 0))
      .limit(Number(limit || -1))

    return Response.json(tasksByUser)
  } catch (error) {
    console.error(error)
    return new Response("Failed", { status: 500 })
  }
}
