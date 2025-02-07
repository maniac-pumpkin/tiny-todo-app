"use client"

import { directoryEdit } from "@/app/actions/directory-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useDirectories from "@/hooks/use-directories"
import { toast } from "@/hooks/use-toast"
import { Pencil } from "lucide-react"
import Form from "next/form"

function EditDirectory({ id }: { id: number }) {
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async (f: FormData) => {
    if (await directoryEdit(f, id)) {
      toast({
        title: "Edition success",
        description: "Directory name updated successfully.",
      })
      refresh()
    } else
      toast({
        title: "Edition failed",
        description: "Failed to edit the directory.",
        variant: "destructive",
      })
  }

  return (
    <RegularDialog
      title="Edit current directory name"
      description="Capitalized directory name, up to 15 characters in length."
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
      }
      content={
        <Form action={handleAction} className="w-full space-y-5">
          <Label className="block space-y-2">
            <span>New directory name</span>
            <Input type="text" name="dir-name" placeholder="ex: financial" maxLength={20} required />
          </Label>
          <SubmitButton text="Edit directory" />
        </Form>
      }
    />
  )
}

export default EditDirectory
