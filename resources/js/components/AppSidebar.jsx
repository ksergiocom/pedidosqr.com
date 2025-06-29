import React from "react";

import { Calendar, Home, Inbox, Search, Settings, ShoppingCart, Hamburger, HandPlatter, QrCode, ChevronUp, User2 } from "lucide-react"



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Pedidos",
    url: "/gestion/pedidos",
    icon: HandPlatter,
  },
  {
    title: "Artículos",
    url: "/gestion/articulos",
    icon: Hamburger,
  },
  {
    title: "Mesas",
    url: "/gestion/mesas",
    icon: QrCode,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              //  className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <Link method="post" href="/auth/logout">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}