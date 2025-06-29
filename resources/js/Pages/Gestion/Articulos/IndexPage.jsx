import React, { useState } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Trash, Edit, CirclePlus } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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

            <section className="w-3xl">

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
                                    <div className="flex items-stretch gap-4 p-2">
                                        {/* Imagen a la izquierda, estirándose para igualar la altura del bloque de texto */}
                                        {art.image_url ? 
                                            <img
                                                src={art.image_url}
                                                alt={art.nombre}
                                                className="w-1/4 h-full object-cover rounded"
                                            />
                                            :
                                            <p>Sin imagen</p>
                                        }

                                        {/* Zona de descripción + botones */}
                                        <div className="flex flex-col flex-1">
                                            <div className="text-sm text-muted-foreground">
                                                {art.descripcion || "Sin descripción"}
                                            </div>
                                            <div className="flex justify-end gap-2 mt-8">
                                                <Link href={`/gestion/articulos/${art.id}/editar`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        Editar
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => confirmDelete(art.id)}
                                                >
                                                    <Trash className="w-4 h-4 mr-1" />
                                                    Borrar
                                                </Button>
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
                    description="Esta acción eliminará el artículo seleccionado. Esta operación no se puede deshacer."
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
