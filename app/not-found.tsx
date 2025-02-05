import BigMessage from "@/components/helpers/big-message"
import { TriangleAlert } from "lucide-react"

export default function NotFound() {
  return <BigMessage Icon={<TriangleAlert size={32} />} text="Page not found." />
}
