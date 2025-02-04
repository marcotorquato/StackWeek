import { UserButton } from '@clerk/nextjs'
import { ArrowDownUp, ChartArea, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggleButton } from './theme-toggle-button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

// Menu items.
const itemsSaveMoney = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartArea,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: ArrowDownUp,
  },
]

const itemsAcrobatic = [
  {
    title: 'IT Orders',
    url: '/orders-it',
    icon: ArrowDownUp,
  },
]

export function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="bg-accent w-full shadow-lg flex items-center justify-center rounded-xl mt-4">
          <UserButton showName />
        </SidebarHeader>

        <SidebarMenu>
          <Collapsible
            defaultOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            className="bg-accent rounded-xl"
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex items-center justify-between w-full">
                <span>iSaveMoney AI</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all duration-500 ease-in-out">
              <SidebarMenu>
                {itemsSaveMoney.map((item) => (
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
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            defaultOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            className="bg-accent rounded-xl"
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex items-center justify-between w-full">
                <span>Acrobatic</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all duration-500 ease-in-out">
              <SidebarMenu>
                {itemsAcrobatic.map((item) => (
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
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenu>

        {/* Botão de troca de tema */}
        <div className="mt-auto mb-4">
          <ThemeToggleButton />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
