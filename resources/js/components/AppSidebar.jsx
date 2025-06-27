import React from "react";

import { Calendar, Home, Inbox, Search, Settings, ShoppingCart, Hamburger, HandPlatter, QrCode } from "lucide-react"



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
    </Sidebar>
  )
}