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

function CreatePage(props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        precio: '',
        descripcion: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/gestion/articulos/crear');
    }

    return (
        <form onSubmit={submit}>
            <Card>
                <CardHeader>
                    <CardTitle>Crear Artículo</CardTitle>
                    <CardDescription>Crear un nuevo artículo para mostrar en los menús</CardDescription>
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
                        Crear
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

CreatePage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default CreatePage;
