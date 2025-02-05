"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import type { FetchedDataType } from "@/hooks/use-fetch-fn"
import useFetchFn from "@/hooks/use-fetch-fn"
import { directoryGet } from "@/lib/client-api-services"
import { ChevronsUpDown, Folders, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import CreateDirectory from "./dirs-create"
import DeleteDirectory from "./dirs-delete"
import EditDirectory from "./dirs-edit"

type DirPropsType = Pick<FetchedDataType<{ name: string; id: number; userId: number }[]>, "data" | "fetchData">
export type DirOpPropsType = { id: number; fetchData: DirPropsType["fetchData"] }

function DropDown({ id, fetchData }: DirOpPropsType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <EditDirectory id={id} fetchData={fetchData} />
        <DeleteDirectory id={id} fetchData={fetchData} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Directories({ data: dirs, fetchData }: DirPropsType) {
  return dirs?.map(({ name, id }) => (
    <SidebarMenuSub key={crypto.randomUUID()}>
      <SidebarMenuSubItem className="flex">
        <SidebarMenuButton isActive={false} asChild>
          <Link href={`/directories/${name}`}>{name}</Link>
        </SidebarMenuButton>
        {name !== "main" && <DropDown id={id} fetchData={fetchData} />}
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  ))
}

function AppSidebarDirs() {
  const { data, fetchData } = useFetchFn(directoryGet)

  return (
    <Collapsible>
      <SidebarMenuItem>
        <section className="flex">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Folders />
              <span>Directories</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CreateDirectory fetchData={fetchData} />
        </section>
        <CollapsibleContent>
          <Directories data={data} fetchData={fetchData} />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default AppSidebarDirs
