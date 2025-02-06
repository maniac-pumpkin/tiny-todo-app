"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CircleCheck, CircleX, LayoutGrid, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    id: 1,
    title: "All tasks",
    icon: <LayoutGrid />,
    url: "/",
  },
  {
    id: 2,
    title: "Important tasks",
    icon: <Star />,
    url: "/important",
  },
  {
    id: 3,
    title: "Completed tasks",
    icon: <CircleCheck />,
    url: "/completed",
  },
  {
    id: 4,
    title: "Uncompleted tasks",
    icon: <CircleX />,
    url: "/uncompleted",
  },
]

function AppSidebarLinks() {
  const pathname = usePathname()

  return links.map(({ id, title, icon, url }) => (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))
}

export default AppSidebarLinks
