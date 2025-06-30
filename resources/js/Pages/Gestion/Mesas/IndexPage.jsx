import React, { useState } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Trash, QrCode, Edit, CirclePlus, EllipsisVertical, Eye } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

function MesasPage(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (idToDelete) {
      router.visit(`/gestion/mesas/${idToDelete}`, {
        method: "delete",
      });
    }
  };

  return (
    <div className="flex flex-col w-3xl">
      <h1 className="text-4xl font-semibold">Listado de mesas</h1>
      <p className="mt-2">
        Aquí se pueden gestionar las mesas disponibles; agregar, eliminar y ver
        el código QR asignado a cada mesa.
      </p>
      <Link className="mt-8" href="/gestion/mesas/crear">
        <Button variant='outline' className="w-fit">
          {/* <CirclePlus /> */}
          <span>Agregar mesa</span>
        </Button>
      </Link>

      <div className="mt-8 grid grid-cols-3 gap-5">
        {props.mesas.map(mesa => (
          <AspectRatio key={mesa.id} ratio={1 / 1}>


            <AspectRatio key={mesa.id} ratio={1 / 1}>
              <Card className="m-0 p-0 h-full w-full relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QRCodeSVG
                    value={`/${mesa.id}`}
                    className="w-3/5 h-3/5"
                  />
                </div>
                <h2 className="absolute top-1 left-1 z-10 m-2 font-semibold">{mesa.nombre}</h2>
                <div className="absolute top-1 right-1 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/gestion/mesas/${mesa.id}`}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/gestion/mesas/${mesa.id}/editar`}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => confirmDelete(mesa.id)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </AspectRatio>

          </AspectRatio>
        ))}
      </div>

      {/* <Table className='mt-8'>
        <TableBody>
          {props.mesas.map((mesa) => (
            <TableRow key={mesa.id}>
              <TableCell className='font-semibold'><Link className="hover:underline" href={`/gestion/mesas/${mesa.id}`}>{mesa.nombre}</Link></TableCell>
              <TableCell className="flex justify-end gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/gestion/mesas/${mesa.id}`}>
                        <QrCode className="w-full h-full" />
                      </Link>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full">
                    <QRCodeSVG value={`/${mesa.id}`} />
                  </HoverCardContent>
                </HoverCard>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/gestion/mesas/${mesa.id}`}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/gestion/mesas/${mesa.id}/editar`}
                        className="flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>

                    <DropdownMenuItem
                      onClick={() => confirmDelete(mesa.id)}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

      <ConfirmDialog
        title="¿Estás seguro?"
        description="¡Cuidado! Esta acción eliminará la mesa seleccionada. Esta operación no se puede deshacer."
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
      />
    </div>
  );
}

MesasPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de mesas" />
);

export default MesasPage;
