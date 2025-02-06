import { Progress } from "@/components/ui/progress"
import useFetchFn from "@/hooks/use-fetch-fn"
import { taskGetCompleted } from "@/lib/client-api-services"

function AppSidebarProgress() {
  const { data } = useFetchFn(taskGetCompleted)

  return (
    <section className="mx-4">
      <div className="mb-2 flex justify-between">
        <span className="text-sm">Tasks done</span>
        <span className="text-sm">{data ?? 0}%</span>
      </div>
      <Progress className="h-3" value={+data!} />
    </section>
  )
}

export default AppSidebarProgress
