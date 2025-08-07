import React from "react";
import { Link, usePage } from "@inertiajs/react";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  HandPlatter,
  Hamburger,
  QrCode,
  User2,
  ChevronDown,
  Info,
  EqualApproximately,
  Phone,
  ChartNoAxesCombined,
  PackageSearch,
  History,
  User,
  ShoppingCart,
  Package,
  ChevronUp,
} from "lucide-react";

const sections = [
  {
    label: "Gestión",
    items: [
      { title: "Pedidos", url: "/gestion/pedidos", icon: ShoppingCart },
      { title: "Artículos", url: "/gestion/articulos", icon: Package },
      { title: "Códigos", url: "/gestion/codigos", icon: QrCode },
    ],
  },
  // {
  //   label: "Información",
  //   items: [
  //     { title: "Ayuda", url: "/info", icon: Info },
  //     { title: "Sobre nosotros", url: "/info/sobre-nosotros", icon: EqualApproximately },
  //     { title: "Contacto", url: "/info/contacto", icon: Phone },
  //   ],
  // },
  {
    label: "Información",
    items: [
      { title: "Historial", url: "/analisis/historial", icon: History },
      { title: "Perfil", url: "/perfil", icon: User },
      // { title: "Estadisticas", url: "/analisis/estadisticas", icon: ChartNoAxesCombined },
    ],

  },
];

export default function AppSidebar() {
  // Saca url y props por separado
  const { props, url } = usePage();
  const { auth } = props;

  const activeClasses =
    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear";

  return (
    <Sidebar>
      <SidebarHeader>
        <a href="/"><h3 className="text-xl p-2">pedidosqr.com</h3></a>
      <SidebarSeparator />
      </SidebarHeader>


      <SidebarContent className="overflow-x-hidden">
        {sections.map((section) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => {
                    const isActive = url.startsWith(item.url);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={isActive ? activeClasses : ""}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </React.Fragment>
        ))}
      </SidebarContent>


      <SidebarFooter>
<SidebarSeparator />
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex justify-between">
                <User2 /> {auth.user.email ?? "Usuario"}
                <ChevronUp />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
              <DropdownMenuItem asChild>
                <Link className="w-full" href="/perfil">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link className="w-full" href="#">
                  Facturación
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link className="w-full" method="post" href="/auth/logout">
                  Cerrar sesión
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
