"use client"

import { directoryDelete } from "@/app/actions/directory-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import useDirectories from "@/hooks/use-directories"
import { toast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"

function DeleteDirectory({ id }: { id: number }) {
  const refresh = useDirectories((state) => state.refresh)

  const handleAction = async () => {
    if (await directoryDelete(id)) {
      toast({
        title: "Directory deleted",
        description: "The directory and all its tasks have been successfully deleted.",
      })
      refresh()
    } else
      toast({
        title: "Deletion failed",
        description: "The directory could not be deleted.",
        variant: "destructive",
      })
  }

  return (
    <AlertDialog
      description="This action will delete the directory and all its tasks."
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      }
      actionFn={handleAction}
    />
  )
}

export default DeleteDirectory
