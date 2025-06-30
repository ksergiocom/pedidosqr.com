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
} from "@/components/ui/dropdown-menu";

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
        <div className="flex flex-col max-w-3xl">

            <h1 className="text-4xl font-semibold">Listado de artículos</h1>
            <p className="mt-2">
                Crea aquí los artículos que quieres que <strong>aparezcan</strong> en tu menú QR.
            </p>

            <Link className="w-fit mt-8" href="/gestion/articulos/crear">
                <Button className="w-fit">
                    <CirclePlus />
                    <span>Agregar artículo</span>
                </Button>
            </Link>

            <section className="w-3xl mt-8">

                {articulos.length === 0 ? (
                    <p className="text-muted-foreground">No hay artículos disponibles.</p>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {articulos.map((art) => (
                            <AccordionItem key={art.id} value={art.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <span className="font-medium">{art.nombre}</span>
                                        <span>{art.precio.toFixed(2)}€</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex gap-4 p-2 min-h-40 "> {/* fija una altura, o usa h-full si el padre ya la da */}
                                        {/* Imagen */}
                                        {art.image_url ? (
                                            <img
                                                src={art.image_url}
                                                alt={art.nombre}
                                                className="w-1/4 h-full object-cover object-center rounded"
                                            />
                                        ) : (
                                            <div className="w-1/4 h-full bg-gray-100 flex items-center justify-center rounded">
                                                Sin imagen
                                            </div>
                                        )}

                                        {/* Descripción + botones */}
                                        <div className="flex flex-col flex-1">
                                            {/* Descripción: si no, centrar */}
                                            {art.descripcion ?
                                                <div
                                                    className="flex-1 text-sm text-muted-foreground"
                                                >
                                                    {art.descripcion}
                                                </div>
                                                : <div className="flex-1 flex items-center justify-center">
                                                    <span className="text-sm text-gray-300">Sin descripción</span>
                                                </div>
                                            }

                                            {/* Botones abajo a la derecha */}
                                            <div className="flex justify-end mt-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline">
                                                            <EllipsisVertical className="w-5 h-5" />
                                                            <span>Acciones</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/gestion/articulos/${art.id}`}>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                Ver
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/gestion/articulos/${art.id}/editar`}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Editar
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => confirmDelete(art.id)}
                                                            className="text-destructive"
                                                        >
                                                            <Trash className="w-4 h-4 mr-2 text-destructive" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

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
