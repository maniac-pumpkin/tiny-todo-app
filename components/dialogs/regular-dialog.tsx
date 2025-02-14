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
  control?: {
    open: boolean
    onOpenChange: (open: boolean) => void
  }
}

function RegularDialog({ title, description, content, trigger, control }: PropsType) {
  return (
    <Dialog open={control?.open} onOpenChange={control?.onOpenChange}>
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
