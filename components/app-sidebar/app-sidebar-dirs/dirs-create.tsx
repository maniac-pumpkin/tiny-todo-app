"use client"

import { directoryCreate } from "@/app/actions/directory-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import useDirectories from "@/hooks/use-directories"
import { toast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import Form from "next/form"
import { useState } from "react"

function CreateDirectory() {
  const [isOpen, setIsOpen] = useState(false)
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async (f: FormData) => {
    if (await directoryCreate(f)) {
      toast({
        title: "Success",
        description: `Directory created successfully.`,
      })
      refresh()
      setIsOpen(false)
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
      control={{ open: isOpen, onOpenChange: setIsOpen }}
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
