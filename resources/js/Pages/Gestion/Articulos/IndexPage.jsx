import React, { useState } from "react";
import GestionLayout from "../../Layout/GestionLayout";
import { Plus } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import CardArticulo from "@/components/CardArticulo";
import { Card } from "@/components/ui/card";

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

                {/*                 
                    <Link href="/gestion/mesas/crear" className=" group block h-full w-full">
                        <Card className="m-0 p-0 h-full w-full grid items-center justify-center bg-gray-100 hover:bg-gray-200 transition">
                            <Plus className="text-gray-300 group-hover:text-gray-500 transition" />
                        </Card>
                    </Link> */}


                {articulos.length === 0 ? (
                    <p className="text-muted-foreground">No hay artículos disponibles.</p>
                ) : (
                    articulos.map((art) => (
                        <CardArticulo
                            key={art.id}
                            art={art}
                            confirmDelete={confirmDelete}
                        />
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
