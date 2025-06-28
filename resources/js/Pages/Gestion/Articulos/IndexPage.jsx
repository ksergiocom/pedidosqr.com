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
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

function IndexPage(props) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const confirmDelete = (id) => {
        setIdToDelete(id);
        setShowConfirm(true);
    };

    const handleDelete = () => {
        if (idToDelete) {
            router.visit(`/gestion/articulos/${idToDelete}`, {
                method: "delete",
            });
        }
    };

    return (
        <div className="flex flex-col gap-7">
            <h1>Listado de artículos</h1>
            <p>
                Crea los artículos de tu menú. Se mostrarán en el menú del
                código QR para ser seleccionados.
            </p>
            <Link href="/gestion/articulos/crear">
                <Button className="w-fit">
                    <CirclePlus />
                    <span>Agregar artículo</span>
                </Button>
            </Link>

            <Table>
                <TableCaption>Listado de artículos disponibles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Uuid</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.articulos.map((articulo) => (
                        <TableRow key={articulo.id}>
                            <TableCell>{articulo.id}</TableCell>
                            <TableCell>{articulo.nombre}</TableCell>
                            <TableCell>{articulo.precio}</TableCell>
                            <TableCell className="flex justify-end gap-2">
                                <Link
                                    href={`/gestion/articulos/${articulo.id}/editar`}
                                >
                                    <Button variant="ghost" size="icon">
                                        <Edit />
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => confirmDelete(articulo.id)}
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
                description="Esta acción eliminará la articulo seleccionada. Esta operación no se puede deshacer."
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

IndexPage.layout = (page) => (
    <GestionLayout children={page} title="Gestión de articulos" />
);

export default IndexPage;
