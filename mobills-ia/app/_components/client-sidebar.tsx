// app/_components/ClientSidebar.tsx (Client Component)
'use client'

import { usePathname } from 'next/navigation'
import { SidebarComponent } from './sidebar'
import { SidebarTrigger } from './ui/sidebar'

export default function ClientSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Routes where the Sidebar will not be displayed
  const excludedRoutes = ['/login', '/register']
  const isExcludedRoute = excludedRoutes.includes(pathname)

  return (
    <>
      {/* Only render SidebarComponent and SidebarTrigger if the current route is not excluded */}
      {!isExcludedRoute && (
        <>
          <SidebarComponent />
          <SidebarTrigger />
        </>
      )}
      <main className="w-full">{children}</main>
    </>
  )
}
