"use client"

import { directoryCreate } from "@/app/actions/directory-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { toast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import Form from "next/form"
import type { DirOpPropsType } from "./dirs-index"

type PropsType = { fetchData: DirOpPropsType["fetchData"] }

function CreateDirectory({ fetchData }: PropsType) {
  const handleAction = async (f: FormData) => {
    if (await directoryCreate(f)) {
      toast({
        title: "Success",
        description: `Directory created successfully.`,
      })
      fetchData()
    } else
      toast({
        title: "Error",
        description: "Failed to create directory.",
        variant: "destructive",
      })
  }

  return (
    <RegularDialog
      title="Create directory"
      description="Capitalized directory name, up to 15 characters in length."
      trigger={
        <SidebarMenuButton className="w-8 justify-center">
          <Plus />
        </SidebarMenuButton>
      }
      content={
        <Form action={handleAction} className="w-full space-y-5">
          <Label className="block space-y-2">
            <span>Directory name</span>
            <Input type="text" name="dir-name" placeholder="ex: financial" maxLength={20} required />
          </Label>
          <SubmitButton text="Add directory" />
        </Form>
      }
    />
  )
}

export default CreateDirectory
