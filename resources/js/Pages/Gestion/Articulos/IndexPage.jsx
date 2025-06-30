import React, { useState } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Trash, Edit, CirclePlus, Eye, EllipsisVertical } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { truncarTexto } from "@/lib/truncar";

function IndexPage({ articulos }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const confirmDelete = (id) => {
        setIdToDelete(id);
        setShowConfirm(true);
    };
    const handleDelete = () => {
        if (idToDelete) {
            router.visit(`/gestion/articulos/${idToDelete}`, { method: "delete" });
        }
    };

    return (
        <div className="flex flex-col">

            <h1 className="text-4xl font-semibold">Listado de artículos</h1>
            <p className="mt-2">
                Crea aquí los artículos que quieres que <strong>aparezcan</strong> en tu menú QR.
            </p>

            <Link className="w-fit mt-8" href="/gestion/articulos/crear">
                <Button variant='outline' className="w-fit">
                    {/* <CirclePlus /> */}
                    <span>Agregar artículo</span>
                </Button>
            </Link>

            <section className="mt-8 grid grid-cols-2 gap-5">

                {articulos.length === 0 ? (
                    <p className="text-muted-foreground">No hay artículos disponibles.</p>
                ) : (
                    articulos.map((art) => (
                        <Card className="p-0 overflow-hidden h-full">
                            <div className="flex h-full">
                                {/* Imagen */}
                                <div className="w-56 h-full">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={art.image_url}
                                        alt={art.nombre}
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="flex flex-col justify-between p-2 px-4 flex-1">
                                    <div>
                                        <div className="flex justify-between">
                                            <h2 className="text-lg font-semibold">
                                                <span className="text-2xl mr-3">{art.nombre}</span>
                                                <span className="font-normal">{art.precio}€</span>
                                            </h2>
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            {truncarTexto(art.descripcion, 150)}
                                        </p>
                                    </div>


                                </div>
                                {/* Acciones */}
                                <div className="flex justify-end m-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <EllipsisVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/gestion/articulos/${art.id}`}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Ver
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/gestion/articulos/${art.id}/editar`}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Editar
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => confirmDelete(art.id)}
                                                className="flex items-center gap-2 text-red-600"
                                            >
                                                <Trash className="w-4 h-4" />
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </Card>


                    ))
                )}

                <ConfirmDialog
                    title="¿Estás seguro?"
                    description="¡Cuidado! Esta acción eliminará el artículo seleccionado. Esta operación no se puede deshacer."
                    open={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        setShowConfirm(false);
                        handleDelete();
                    }}
                />
            </section>
        </div>
    );
}

IndexPage.layout = (page) => (
    <GestionLayout children={page} title="Gestión de artículos" />
);

export default IndexPage;
