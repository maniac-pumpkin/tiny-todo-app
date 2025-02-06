import { z } from "zod"

export const userBodySchema = z.strictObject({
  username: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(/^[a-z]+$/),
  password: z.string().trim().min(8),
})

export const updateUserBodySchema = z.strictObject({
  username: userBodySchema.shape.username.nullable(),
  prevPassword: userBodySchema.shape.password.nullable(),
  newPassword: userBodySchema.shape.password.nullable(),
})

export const dirBodySchema = z.strictObject({
  name: z.string().min(1).max(20),
})

export const taskBodySchema = z.strictObject({
  title: z.string().min(3).max(25),
  description: z.string().max(80),
  deadline: z.string(),
  isCompleted: z.boolean(),
  isImportant: z.boolean(),
})
