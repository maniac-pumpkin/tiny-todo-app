import { Progress } from "@/components/ui/progress"

function AppSidebarProgress() {
  return (
    <section className="mx-4">
      <div className="mb-2 flex justify-between">
        <span className="text-sm">Tasks done</span>
        <span className="text-sm">20%</span>
      </div>
      <Progress className="h-3" value={20} />
    </section>
  )
}

export default AppSidebarProgress
