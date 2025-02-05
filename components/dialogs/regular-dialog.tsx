"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"

type PropsType = {
  title: string
  description?: string
  trigger: ReactNode
  content: ReactNode
}

function RegularDialog({ title, description, content, trigger }: PropsType) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{content}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RegularDialog
