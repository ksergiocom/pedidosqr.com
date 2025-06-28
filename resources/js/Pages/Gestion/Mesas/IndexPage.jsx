import React, { useState } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Trash, QrCode, Edit, CirclePlus } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {QRCodeSVG} from 'qrcode.react';

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
    <div className="flex flex-col gap-7">
      <h1>Listado de mesas</h1>
      <p>
        Aquí se pueden gestionar las mesas disponibles; agregar, eliminar y ver
        el código QR asignado a cada mesa.
      </p>
      <Link href="/gestion/mesas/crear">
        <Button className="w-fit">
          <CirclePlus />
          <span>Agregar mesa</span>
        </Button>
      </Link>

      <Table>
        <TableCaption>Listado de mesas disponibles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Uuid</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.mesas.map((mesa) => (
            <TableRow key={mesa.id}>
              <TableCell>{mesa.id}</TableCell>
              <TableCell>{mesa.nombre}</TableCell>
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
                <Link href={`/gestion/mesas/${mesa.id}/editar`}>
                  <Button variant="ghost" size="icon">
                    <Edit />
                  </Button>
                </Link>
                <Button
                  onClick={() => confirmDelete(mesa.id)}
                  variant="ghost"
                  size="icon"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        title="¿Estás seguro?"
        description="Esta acción eliminará la mesa seleccionada. Esta operación no se puede deshacer."
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
