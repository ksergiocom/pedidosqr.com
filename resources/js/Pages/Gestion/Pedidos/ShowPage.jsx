import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";
import { calcularTotalPedido, formatearFechaHora, minutosTranscurridos } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Trash } from "lucide-react";
import { Link } from "@inertiajs/react";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";
import CardPedido from "@/components/CardPedido";

const ShowPage = ({ pedido }) => {
  return (
    <div className="flex flex-col">
      <Title>Detalle de pedido</Title>
       <TitleDescription className="mt-5 mb-8">Pendiente implementarár estadisticas. También que se puedan eliminar o editar los pedidos para uso gestión interna. ¡Cuidado! Lo pedidos borrados no se tienen en cuenta en las estadísticas finales.</TitleDescription>
      <CardPedido pedido={pedido} mesa={pedido.mesa}/>

    </div>
  );
};

ShowPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default ShowPage;
