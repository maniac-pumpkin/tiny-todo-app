"use client"

import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteCookie } from "@/lib/utils"
import { redirect } from "next/navigation"

function SignOutModal() {
  const handleClick = () => {
    deleteCookie("token")

    redirect("/sign-in")
  }

  return (
    <AlertDialog
      description="You're about to get signed out. You can sign back in anytime you want."
      trigger={
        <Button className="w-full" variant="outline" size="sm">
          Sign out
        </Button>
      }
      actionFn={handleClick}
    />
  )
}

export default SignOutModal
