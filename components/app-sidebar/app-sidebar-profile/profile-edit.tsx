import { userUpdateCredits } from "@/app/actions/user-actions"
import RegularDialog from "@/components/dialogs/regular-dialog"
import SubmitButton from "@/components/helpers/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { deleteCookie } from "@/lib/utils"
import Form from "next/form"
import { redirect } from "next/navigation"

function EditCredentialsForm() {
  const handleAction = async (f: FormData) => {
    if (await userUpdateCredits(f)) {
      toast({
        title: "Credentials updated",
        description: "You're now signed out and your credentials are updated",
      })

      deleteCookie("token")

      redirect("/sign-in")
    }

    toast({
      title: "Failed to update credentials",
      description: "Please try again later",
      variant: "destructive",
    })
  }

  return (
    <RegularDialog
      title="Edit credentials"
      description="Fill out the fields you wanna edit"
      trigger={
        <Button className="w-full" variant="secondary" size="sm">
          Edit credentials
        </Button>
      }
      content={
        <Form action={handleAction} className="flex flex-grow flex-col gap-y-5">
          <Label className="space-y-2">
            <span>Username</span>
            <Input
              type="text"
              placeholder="e.g admin"
              name="username"
              pattern="^[a-z]{3,100}$"
              title="Enter between 3 and 100 lowercase letters with no spaces"
            />
          </Label>
          <Label className="space-y-2">
            <span>Previous password</span>
            <Input type="password" placeholder="e.g admin" name="prev-password" minLength={8} />
          </Label>
          <Label className="space-y-2">
            <span>New password</span>
            <Input type="password" placeholder="e.g admin" name="new-password" minLength={8} />
          </Label>
          <SubmitButton text="Update credentials" />
        </Form>
      }
    />
  )
}

export default EditCredentialsForm
