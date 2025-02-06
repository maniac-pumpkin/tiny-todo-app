"use client"

import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { formatDate } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import AddTask from "./app-topbar-add-task"
import AppTopbarFilter from "./app-topbar-filter"
import AppTopbarTitle from "./app-topbar-title"

function AppTopbar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [text, setText] = useState(searchParams.get("search") ?? "")

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams)

      if (text) params.set("search", text)
      else params.delete("search")

      router.replace(`${pathname}?${params.toString()}`)
    }, 500)

    return () => clearTimeout(handler)
  }, [text, pathname, router, searchParams])

  return (
    <header className="my-5 space-y-8">
      <nav className="flex items-center justify-between gap-x-2">
        <SidebarTrigger className="md:hidden" />
        <Input
          type="search"
          placeholder="Search for tasks"
          className="hidden w-1/4 lg:block"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <span className="text-sm sm:text-base">{formatDate(new Date())}</span>
        <AddTask />
      </nav>
      <Input
        type="search"
        placeholder="Search for tasks"
        className="lg:hidden"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <AppTopbarTitle />
      <AppTopbarFilter />
    </header>
  )
}

export default AppTopbar
