import React from "react";
import { useState } from "react";

import GestionLayout from "../../Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";

import { Trash, QrCode, Edit, Plus, CirclePlus } from "lucide-react";

import { Link } from "@inertiajs/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";


function MesasPage(props){
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = () => {
        alert('DELETE!');
    }

    return (
        <div className="flex flex-col gap-7">
            <h1>Listado de mesas</h1>
            <p>Aquí se pueden gestionar las mesas disponibles; agregar, eliminar y ver el código QR asignado a cada mesa.</p>
            <Link href="/gestion/mesas/crear">
                <Button className='w-fit'>
                    <CirclePlus/>
                    <span>Agregar mesa</span>
                </Button>
            </Link>
            <Table>
                <TableCaption>Listado de mesas disponibles</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Uuid</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {props.mesas.map(mesa => (
                    <TableRow key={mesa.id}>
                        <TableCell>{mesa.id}</TableCell>
                        <TableCell>{mesa.nombre}</TableCell>
                        <TableCell className='flex justify-end'>
                            <Button variant="ghost" size="icon">
                                <QrCode></QrCode>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Edit></Edit>
                            </Button>
                            <Button onClick={() => setShowConfirm(true)} variant="ghost" size="icon">
                                <Trash></Trash>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <ConfirmDialog
                title='Are you absolutely sure?'
                description='This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleDelete}
            >
            </ConfirmDialog>
        </div>
        
    )
}

MesasPage.layout = page => <GestionLayout children={page} title="Welcome" />


export default MesasPage;