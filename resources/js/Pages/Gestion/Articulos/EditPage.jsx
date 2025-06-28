import React from "react";

import GestionLayout from "../../Layout/GestionLayout";

import { Link, useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction, CardFooter } from "@/components/ui/card";

import { MoveLeft } from "lucide-react";

function EditPage(props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: props.articulo.nombre || '',
        precio: props.articulo.precio || '',
        descripcion: props.articulo.descripcion || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/gestion/articulos/${props.articulo.id}/editar`);
    }

    return (
        <form onSubmit={submit}>
            <Card>
                <CardHeader>
                    <CardTitle>Actualizar Artículo</CardTitle>
                    <CardDescription>Modifica los datos del artículo.</CardDescription>
                    <CardAction>
                        <Link href="/gestion/articulos">
                            <Button type="button" variant="ghost" size="icon">
                                <MoveLeft />
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
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
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3 mt-5">
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
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3 mt-5">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Opcional"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <small className="text-red-500">{errors.descripcion}</small>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing} className="w-full">
                        Actualizar
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

EditPage.layout = page => <GestionLayout children={page} title="Editar Artículo" />;

export default EditPage;
