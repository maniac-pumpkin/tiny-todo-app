import { userDeleteAcc } from "@/app/actions/user-actions"
import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { deleteCookie } from "@/lib/utils"
import { redirect } from "next/navigation"

function DeleteAccountModal() {
  const handleClick = async () => {
    if (await userDeleteAcc()) {
      toast({
        title: "Account deleted",
        description: "You're now signed out and your account is deleted",
      })

      deleteCookie("token")

      redirect("/sign-in")
    }

    toast({
      title: "Failed to delete account",
      description: "Please try again later",
      variant: "destructive",
    })
  }

  return (
    <AlertDialog
      description="You're about to delete your account. Remember, this action cannot be undone."
      trigger={
        <Button className="w-full" variant="destructive" size="sm">
          Delete account
        </Button>
      }
      actionFn={handleClick}
    />
  )
}

export default DeleteAccountModal
