import { TriangleAlert } from "lucide-react"

export default function NotFound() {
  return (
    <div className="absolute left-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center gap-x-2">
      <TriangleAlert />
      <h3 className="text-lg font-semibold">Directory not found.</h3>
    </div>
  )
}
