import { taskDelete } from "@/app/actions/task-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Trash } from "lucide-react"

type PropsType = { id: number }

function TaskCardDeleteBtn({ id }: PropsType) {
  const handleAction = async () => {
    if (await taskDelete(id))
      toast({
        title: "Deletion success",
        description: "The task has been successfully deleted.",
      })
    else
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the task. Please try again.",
        variant: "destructive",
      })
  }

  return (
    <AlertDialog
      description="This action will permanently delete the task."
      trigger={
        <Button size="icon" variant="ghost">
          <Trash />
        </Button>
      }
      actionFn={handleAction}
    />
  )
}

export default TaskCardDeleteBtn
