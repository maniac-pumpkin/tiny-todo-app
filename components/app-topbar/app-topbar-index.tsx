"use client"

import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import useFiltering from "@/hooks/use-filtering"
import { formatDate } from "@/lib/utils"
import AddTask from "./app-topbar-add-task"
import AppTopbarFilter from "./app-topbar-filter"
import AppTopbarTitle from "./app-topbar-title"

function AppTopbar() {
  const search = useFiltering((state) => state.search)
  const updateSearch = useFiltering((state) => state.updateSearch)

  return (
    <header className="my-5 space-y-8">
      <nav className="flex items-center justify-between gap-x-2">
        <SidebarTrigger className="md:hidden" />
        <Input
          type="search"
          placeholder="Search for tasks"
          className="hidden w-1/4 lg:block"
          value={search}
          onChange={(e) => updateSearch(e.currentTarget.value)}
        />
        <span className="text-sm sm:text-base">{formatDate(new Date())}</span>
        <AddTask />
      </nav>
      <Input
        type="search"
        placeholder="Search for tasks"
        className="lg:hidden"
        value={search}
        onChange={(e) => updateSearch(e.currentTarget.value)}
      />
      <AppTopbarTitle />
      <AppTopbarFilter />
    </header>
  )
}

export default AppTopbar
