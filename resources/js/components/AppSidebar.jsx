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
} from "lucide-react";

const sections = [
  {
    label: "Gestión",
    items: [
      { title: "Pedidos", url: "/gestion/pedidos", icon: HandPlatter },
      { title: "Artículos", url: "/gestion/articulos", icon: Hamburger },
      { title: "Mesas", url: "/gestion/mesas", icon: QrCode },
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
    label: "Análisis",
    items: [
      { title: "Historial", url: "/analisis/pedidos", icon: History },
      // { title: "Artículos", url: "/analisis/articulos", icon: PackageSearch },
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
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex justify-between">
                <User2 /> {auth.user.email ?? "Usuario"}
                <ChevronDown />
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
      </SidebarHeader>

      <SidebarSeparator className="mx-auto w-fit" />

      <SidebarContent>
        {sections.map((section) => (
          <React.Fragment key={section.label}>
            <SidebarGroup>
              <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => {
                    const isGestion = section.label === "Gestión";

                    // Si es Ayuda exactamente
                    const isAyuda = item.url === "/info" && url === "/info";

                    // Si es otra info (requiere coincidencia exacta)
                    const isInfo = section.label === "Información" && item.url !== "/info" && url === item.url;

                    // Gestión: coincidencia parcial
                    const isGestionActive = isGestion && url.startsWith(item.url);

                    const isActive = isAyuda || isInfo || isGestionActive;

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

      <SidebarFooter />
    </Sidebar>
  );
}
