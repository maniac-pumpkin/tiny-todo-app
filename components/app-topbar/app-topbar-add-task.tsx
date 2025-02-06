"use client"

import { taskCreate } from "@/app/actions/task-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import DatePicker from "@/components/helpers/date-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useFetchFn from "@/hooks/use-fetch-fn"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "@/hooks/use-toast"
import { directoryGet } from "@/lib/client-api-services"
import Form from "next/form"
import { memo } from "react"
import SubmitButton from "../helpers/submit-button"

function AddTask() {
  const { data, fetchData } = useFetchFn(directoryGet)
  const isMobile = useIsMobile()

  const handleAction = async (f: FormData) => {
    if (await taskCreate(f)) {
      toast({
        title: "Success",
        description: "Task created successfully.",
      })
    } else
      toast({
        title: "Error",
        description: "Failed to create task.",
        variant: "destructive",
      })
  }

  return (
    <RegularDialog
      title="Add a task"
      trigger={<Button size={isMobile ? "sm" : "default"}>Add new task</Button>}
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="space-y-2">
            <span>Title</span>
            <Input
              type="text"
              name="title"
              placeholder="Enter task title (3-20 characters)"
              minLength={3}
              maxLength={20}
              required
            />
          </Label>
          <Label className="space-y-2">
            <span>Deadline</span>
            <DatePicker name="deadline" />
          </Label>
          <Label className="space-y-2">
            <span>Description</span>
            <Textarea
              name="description"
              placeholder="Describe the task in detail (optional, up to 80 characters)"
              maxLength={80}
            />
          </Label>
          <Label className="space-y-2">
            <span>Directory</span>
            <Select name="dir-id" onOpenChange={fetchData} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a directory" />
              </SelectTrigger>
              <SelectContent>
                {data?.map(({ id, name }) => (
                  <SelectItem key={id} value={String(id)}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-important" />
            Mark as important
          </Label>
          <Label className="flex items-center gap-x-2">
            <Checkbox name="is-completed" />
            Mark as completed
          </Label>
          <SubmitButton text="Add task" />
        </Form>
      }
    />
  )
}

export default memo(AddTask)
