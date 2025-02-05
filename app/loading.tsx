import BigMessage from "@/components/helpers/big-message"
import { LoaderCircle } from "lucide-react"

export default function Loading() {
  return <BigMessage Icon={<LoaderCircle size={64} className="animate-spin" />} />
}
