import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar, sidebarItems } from '@/components/shared/app-sidebar'
import { Toaster } from '@/components/ui/sonner'
import { ModeToggle } from '@/components/shared/mode-toggle'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    const location = useLocation() // Retorna um objeto ParsedLocation
    const pathname = location.pathname // Acessa o path da URL
    const activeItem = sidebarItems.find((item) => item.url === pathname)

    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex items-center justify-between border-b border-border bg-background gap-2 p-4 px-6">
           <div className="flex items-center gap-4">
               <SidebarTrigger />
              <h1 className="text-lg font-medium">{activeItem?.title}</h1>
           </div>
           <ModeToggle />
            </header>
            <main className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </main>
            <Toaster position="bottom-center" />
          </div>
        </div>
      </SidebarProvider>
    )
  },
})
