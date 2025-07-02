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

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { router, useForm } from "@inertiajs/react"; // Para navegación y acciones
import { Ban, Check, EllipsisIcon, EllipsisVertical, Trash, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomInput from "@/components/CustomInput";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

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


const HistorialPage = ({ pedidos, filtros }) => {

    const { data, setData, get } = useForm({
        estado: filtros.estado || 'todos',
        desde: filtros.desde || '',
        hasta: filtros.hasta || '',
    });

    const aplicarFiltros = (e) => {
        e.preventDefault();
        get('/analisis/historial');
    };

    return (
        <div className="flex flex-col">
            <Title>Historial pedidos</Title>
            <TitleDescription>Registro de todos los pedidos a modo historico. Si fuese necesario se puede alterar el pedido desde aquí.</TitleDescription>

            {/* Formulario de filtros */}
            <form onSubmit={aplicarFiltros} className="flex flex-col sm:flex-row items-start gap-4 items-center mt-8">
                <div className="w-full">
                    <CustomInput
                        className=" sm:w-auto"
                        placeholder='desde'
                        type='date'
                        value={data.desde}
                        onChange={(e) => {
                            setData('desde', e.target.value);

                        }}
                    />
                </div>
                <div className="w-full">
                    <CustomInput
                        className="sm:w-auto"
                        type='date'
                        value={data.hasta}
                        onChange={(e) => {
                            setData('hasta', e.target.value);

                        }}
                    />
                </div>
                <div className="w-full">
                    <Select
                        className="w-full sm:w-auto"
                        value={data.estado}
                        onValueChange={(value) => setData('estado', value)}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Estado</SelectLabel>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="pendiente">Pendientes</SelectItem>
                                <SelectItem value="completado">Completado</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full sm:w-auto" variant='outline' type="submit">Filtrar</Button>
            </form>



            <Card className='p-0 mt-5'>

                <Table>
                    {/* <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className='text-right'>Total</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader> */}
                    <TableBody>
                        {pedidos.data.map((pedido) => (
                            <TableRow key={pedido.id}>
                                <TableCell className="hidden sm:block font-medium">{pedido.id}</TableCell>
                                <TableCell className="hidden sm:block font-medium">{new Date(pedido.created_at).toLocaleString()}</TableCell>
                                <TableCell className='pl-6 sm:pl-auto'>
                                    <Badge variant={pedido.estado == 'pendiente' ? 'destructive' : 'secondary'}>
                                        {pedido.estado ?? "Sin estado"}
                                    </Badge>
                                </TableCell>
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
                                                <DropdownMenuSeparator />
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
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan="5">


                                <Pagination>
                                    <PaginationContent>
                                        {pedidos.links.map((link, index) => {
                                            const label = link.label;
                                            const isActive = link.active;
                                            const isPrevious = label.includes("Previous");
                                            const isNext = label.includes("Next");

                                            return (
                                                <PaginationItem key={index}>
                                                    {isPrevious ? (
                                                        <PaginationPrevious
                                                            href={link.url || "#"}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (link.url) router.visit(link.url);
                                                            }}
                                                            className={!link.url ? "pointer-events-none opacity-50" : ""}
                                                        />
                                                    ) : isNext ? (
                                                        <PaginationNext
                                                            href={link.url || "#"}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (link.url) router.visit(link.url);
                                                            }}
                                                            className={!link.url ? "pointer-events-none opacity-50" : ""}
                                                        />
                                                    ) : (
                                                        <PaginationLink
                                                            href={link.url || "#"}
                                                            isActive={isActive}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (link.url) router.visit(link.url);
                                                            }}
                                                        >
                                                            {label}
                                                        </PaginationLink>
                                                    )}
                                                </PaginationItem>
                                            );
                                        })}
                                    </PaginationContent>
                                </Pagination>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                    {/* Opcional: un footer o total */}
                </Table>
            </Card>


        </div>
    );
};

HistorialPage.layout = (page) => (
    <GestionLayout title="Análisis pedidos">{page}</GestionLayout>
);

export default HistorialPage;
