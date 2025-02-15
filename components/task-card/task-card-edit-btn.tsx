"use client"

import { taskEdit } from "@/app/actions/task-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Pencil } from "lucide-react"
import Form from "next/form"
import { memo, useState } from "react"
import DatePicker from "../helpers/date-picker"
import SubmitButton from "../helpers/submit-button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import type { TaskCardPropsType } from "./task-card-index"

function TaskCardEditBtn(props: TaskCardPropsType) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = async (f: FormData) => {
    if (await taskEdit(props.id, f)) {
      toast({
        title: "Success",
        description: "The task has been successfully updated.",
      })
      setIsOpen(false)
    } else
      toast({
        title: "Error",
        description: "There was an error updating the task. Please try again.",
        variant: "destructive",
      })
  }

  return (
    <RegularDialog
      title="Edit this task"
      trigger={
        <Button size="icon" variant="ghost">
          <Pencil />
        </Button>
      }
      control={{ open: isOpen, onOpenChange: setIsOpen }}
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="space-y-2">
            <span>Title</span>
            <Input
              type="text"
              name="title"
              placeholder="Enter task title (3-35 characters)"
              defaultValue={props.title}
              minLength={3}
              maxLength={35}
              required
            />
          </Label>
          <Label className="space-y-2">
            <span>Deadline</span>
            <DatePicker name="deadline" defaultValue={props.deadline} />
          </Label>
          <Label className="space-y-2">
            <span>Description</span>
            <Textarea
              name="description"
              placeholder="Describe the task in detail (optional, up to 100 characters)"
              defaultValue={props.description}
              maxLength={100}
            />
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-important" defaultChecked={props.isImportant} />
            <span>Mark as important</span>
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-completed" defaultChecked={props.isCompleted} />
            <span>Mark as completed</span>
          </Label>
          <SubmitButton text="Edit task info" />
        </Form>
      }
    />
  )
}

export default memo(TaskCardEditBtn)
