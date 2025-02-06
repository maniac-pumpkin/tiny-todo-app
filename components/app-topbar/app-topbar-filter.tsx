"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutList, List } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const selectOptions = ["Order added", "Earlier first", "Later first"]

function AppTopbarFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [renderMode, setRenderMode] = useState(searchParams.get("renderMode"))
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy"))

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (renderMode) params.set("renderMode", renderMode)
      if (sortBy) params.set("sortBy", sortBy)

      router.replace(`${pathname}?${params.toString()}`)
    }, 100)

    return () => clearTimeout(handler)
  }, [sortBy, renderMode, pathname, router, searchParams])

  return (
    <div className="flex justify-between">
      <ToggleGroup
        className="hidden sm:block"
        type="single"
        value={renderMode ?? "grid"}
        onValueChange={(value) => value && setRenderMode(value)}
      >
        <ToggleGroupItem value="grid">
          <LayoutList />
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <List />
        </ToggleGroupItem>
      </ToggleGroup>
      <Select value={sortBy ?? "Order added"} onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AppTopbarFilter
