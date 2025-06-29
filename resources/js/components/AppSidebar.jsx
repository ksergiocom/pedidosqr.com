import React from "react";

import { Calendar, Home, Inbox, Search, Settings, ShoppingCart, Hamburger, HandPlatter, QrCode, ChevronUp, User2, ChevronDown } from "lucide-react"

import {usePage} from "@inertiajs/react";

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
  SidebarSeparator,
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

  const {auth} = usePage().props

  return (
    <Sidebar>
        <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className='flex justify-between'>
                <User2 /> {auth.user.email ?? 'Usuario'}
                <ChevronDown className="" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              //  className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Facturación</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link method="post" href="/auth/logout">Cerrar sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator  className='mx-auto w-fit'/>
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