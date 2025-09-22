import { Building, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import type { LucideIcon } from 'lucide-react'

type SidebarItem = {
  title: string
  url: string
  icon: LucideIcon
}

export const sidebarItems: Array<SidebarItem> = [
  {
    title: 'Usuários',
    url: '/users',
    icon: Users,
  },
  { title: 'Organizações', url: '/organizations', icon: Building },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-16 items-center justify-center px-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            AdminPanel
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
