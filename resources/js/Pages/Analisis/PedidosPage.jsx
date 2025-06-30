import React from "react";
import GestionLayout from "../Layout/GestionLayout";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { router } from "@inertiajs/react"; // Para navegación y acciones
import { Ban, Check, EllipsisIcon, EllipsisVertical, Trash, Eye } from "lucide-react";

// Funciones para manejar acciones
const irADetalles = (id) => {
    router.visit(`/gestion/pedidos/${id}`);
};

const eliminarPedido = (id) => {
    if (confirm("¿Estás seguro que quieres eliminar el pedido? Esta acción no se puede deshacer.")) {
        router.delete(`/gestion/pedidos/${id}`);
    }
};

const marcarPendiente = (id) => {
    if (confirm("¿Quieres marcar el pedido como pendiente?")) {
        router.put(`/gestion/pedidos/${id}/pendiente`);
    }
};

const marcarCompletado = (id) => {
    if (confirm("¿Quieres marcar el pedido como completado?")) {
        router.put(`/gestion/pedidos/${id}/completar`);
    }
};

const PedidosPage = ({ pedidos }) => {

    return (
        <div className="flex flex-col">
            <h1 className="mb-4 text-2xl font-bold">Historial pedidos</h1>
            <Table>
                <TableCaption>Listado de pedidos recientes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className='text-right'>Total</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pedidos.map((pedido) => (
                        <TableRow key={pedido.id}>
                            <TableCell className="font-medium">{pedido.id}</TableCell>
                            <TableCell>{new Date(pedido.created_at).toLocaleString()}</TableCell>
                            <TableCell>{pedido.estado ?? "Sin estado"}</TableCell>
                            <TableCell className='text-right'>{pedido.total.toFixed(2)}€</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <EllipsisVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => irADetalles(pedido.id)}>
                                                <Eye></Eye>Ver detalles
                                            </DropdownMenuItem>
                                            {pedido.estado == 'completado' && <DropdownMenuItem onClick={() => marcarPendiente(pedido.id)}>
                                                <Ban></Ban>Marcar pendiente
                                            </DropdownMenuItem>}
                                            {pedido.estado == 'pendiente' && <DropdownMenuItem onClick={() => marcarCompletado(pedido.id)}>
                                                <Check></Check>Marcar terminado
                                            </DropdownMenuItem>}
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem onClick={() => eliminarPedido(pedido.id)} className="text-destructive">
                                                <Trash></Trash>Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* Opcional: un footer o total */}
            </Table>
        </div>
    );
};

PedidosPage.layout = (page) => (
    <GestionLayout title="Análisis pedidos">{page}</GestionLayout>
);

export default PedidosPage;
