import React from "react";

import GestionLayout from "../../Layout/GestionLayout";

import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction, CardFooter } from "@/components/ui/card";

import { MoveLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

function CreatePage(props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        precio: '',
        descripcion: '',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        post('/gestion/articulos/crear');
    }

    return (
        <div className="flex flex-col w-xl">
            <h1 className="text-4xl font-semibold">Crear Artículo</h1>
            <p className="mt-2">Crear un nuevo artículo para mostrar en los menús</p>
            <form onSubmit={submit} className="mt-8 max-w-sm">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                    />
                    {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
                    <p className="text-sm text-muted-foreground">Este nombre será el que se muestre en el menú al cliente</p>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mt-7">
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                        type="number"
                        id="precio"
                        step="0.01"
                        name="precio"
                        value={data.precio}
                        onChange={e => setData('precio', e.target.value)}
                    />
                    {errors.precio && <small className="text-red-500">{errors.precio}</small>}
                    <p className="text-sm text-muted-foreground">Este será el precio mostrado en el menú al cliente. Se guardará siempre con 2 decimales.</p>
                    
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mt-7">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Opcional"
                        value={data.descripcion}
                        onChange={e => setData('descripcion', e.target.value)}
                    />
                    {errors.descripcion && <small className="text-red-500">{errors.descripcion}</small>}
                    <p className="text-sm text-muted-foreground">La descripción es opcional pero recomendable. En el menú se manteiene oculto dentro de la sección desplegable hasta que lo selecciona el cliente.</p>

                </div>
                <div className="grid w-full max-w-sm items-center gap-3 mt-7">
                    <Label htmlFor="image">Imagen (opcional)</Label>
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={e => setData('image', e.target.files[0])}
                    />
                    {errors.image && <small className="text-red-500">{errors.image}</small>}
                    <p className="text-sm text-muted-foreground">La imágen es opcional pero recomendable. Se mostrará en el menú y también en el resumen de los pedidos para mayor facilidad de uso.</p>

                </div>


                <Button disabled={processing} className="w-full mt-10">
                    Guardar
                </Button>

            </form>
        </div>
    );
}

CreatePage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default CreatePage;
