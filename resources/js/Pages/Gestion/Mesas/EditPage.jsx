import React from "react";

import GestionLayout from "../../Layout/GestionLayout";

import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction, CardFooter } from "@/components/ui/card";

import { MoveLeft } from "lucide-react";

function CreatePage(props){

    const { data, setData, put, processing, errors } = useForm({
        nombre: props.mesa.nombre,
    })

    function submit(e) {
        e.preventDefault()
        put(`/gestion/mesas/${props.mesa.id}/editar`)
    }

    return (
        <form onSubmit={submit}>
        <Card>
            <CardHeader>
                <CardTitle>Actualizar Mesa</CardTitle>
                <CardDescription>Actualiza los datos de tu mesa. Seguirá manteniendo su QR único.</CardDescription>
                <CardAction>
                <Link href="/gestion/mesas">
                    <Button type="button" variant="ghost" size="icon">
                        <MoveLeft></MoveLeft>
                    </Button>
                </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="text" id="nombre" name="nombre"
                            value={data.nombre} onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
                    </div>
            </CardContent>
            <CardFooter>
                <Button disabled={processing} className='w-full'>Actualizar</Button>
            </CardFooter>
        </Card>
        </form>
    )
}

CreatePage.layout = page => <GestionLayout children={page} title="Welcome" />


export default CreatePage;