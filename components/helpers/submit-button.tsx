import { LoaderCircle } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

type SubmitButtonProps = {
  text: string
}

function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin" />}
      <span>{text}</span>
    </Button>
  )
}

export default SubmitButton
