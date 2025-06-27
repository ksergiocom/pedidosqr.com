import React from "react";

import GestionLayout from "../../Layout/GestionLayout";

import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction, CardFooter } from "@/components/ui/card";


function CreatePage(props){

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/gestion/mesas/crear')
    }

    return (
        <form onSubmit={submit}>
        <Card>
            <CardHeader>
                <CardTitle>Crear Mesa</CardTitle>
                <CardDescription>Crear nueva mesa a tu grupo de mesas. También se le asocia directamente un QR.</CardDescription>
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
                <Button disabled={processing} className='w-full'>Guardar</Button>
            </CardFooter>
        </Card>
        </form>
    )
}

CreatePage.layout = page => <GestionLayout children={page} title="Welcome" />


export default CreatePage;