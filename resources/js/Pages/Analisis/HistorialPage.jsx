import React, { useState } from "react";
import GestionLayout from "../Layout/GestionLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
import { router, useForm } from "@inertiajs/react";
import { Ban, Check, EllipsisVertical, Trash, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomInput from "@/components/CustomInput";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Separator } from "@/components/ui/separator";

const HistorialPage = ({ pedidos, filtros }) => {
    const { data, setData, get } = useForm({
        estado: filtros.estado || "todos",
        desde: filtros.desde || "",
        hasta: filtros.hasta || "",
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState("");
    const [targetId, setTargetId] = useState(null);

    // Ejecutar filtro automáticamente cuando cambien los valores
    React.useEffect(() => {
        get(
            "/analisis/historial",
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, [data.desde, data.hasta, data.estado]);

    const openConfirm = (type, id) => {
        setActionType(type);
        setTargetId(id);
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        if (!targetId) return;
        switch (actionType) {
            case "delete":
                router.delete(
                    `/gestion/pedidos/${targetId}`,
                    { preserveScroll: true }
                );
                break;
            case "pendiente":
                router.put(
                    `/gestion/pedidos/${targetId}/pendiente`,
                    {},
                    { preserveScroll: true }
                );
                break;
            case "completar":
                router.put(
                    `/gestion/pedidos/${targetId}/completar`,
                    {},
                    { preserveScroll: true }
                );
                break;
            default:
                break;
        }
        setShowConfirm(false);
    };

    return (
        <div className="flex flex-col">
            <Title>Historial pedidos</Title>
            <TitleDescription className="mt-2 sm:mt-5">
                Registro de todos los pedidos a modo histórico. Utiliza los campos de abajo para filtrar por fechas ( desde / hasta ) y/o por el estado de pedido.
            </TitleDescription>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10 mt-8">
                <div className="flex gap-2 w-full">
                <CustomInput
                    placeholder="desde"
                    type="date"
                    className='w-full sm:max-w-[180px]'
                    value={data.desde}
                    onChange={(e) => setData('desde', e.target.value)}
                />
                <CustomInput
                    type="date"
                    className='w-full sm:max-w-[180px]'
                    value={data.hasta}
                    onChange={(e) => setData('hasta', e.target.value)}
                />
                </div>
                <Select className="" value={data.estado} onValueChange={(value) => setData('estado', value)}>
                    <SelectTrigger className="w-full sm:max-w-[180px]">
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

            <Card className="p-0 mt-5">
                <Table>
                    <TableBody>
                        {pedidos.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground p-4">
                                    No hay pedidos registrados.
                                </TableCell>
                            </TableRow>
                        )}
                        {pedidos.data.map((pedido) => (
                            <TableRow key={pedido.id}>
                                <TableCell className="hidden sm:block font-medium">Pedido: <strong>{pedido.id}</strong></TableCell>
                                <TableCell className="hidden sm:block font-medium">
                                    {new Date(pedido.created_at).toLocaleString()}
                                </TableCell>
                                <TableCell className="pl-6">
                                    <Badge variant={pedido.estado === 'pendiente' ? 'destructive' : 'secondary'}>
                                        {pedido.estado ?? 'Sin estado'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{pedido.total.toFixed(2)}€</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <EllipsisVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem disabled onClick={() => router.visit(`/gestion/pedidos/${pedido.id}`)}>
                                                    <Eye /> Ver detalles
                                                </DropdownMenuItem>
                                                {pedido.estado === 'completado' && (
                                                    <DropdownMenuItem onClick={() => openConfirm('pendiente', pedido.id)}>
                                                        <Ban /> Marcar pendiente
                                                    </DropdownMenuItem>
                                                )}
                                                {pedido.estado === 'pendiente' && (
                                                    <DropdownMenuItem onClick={() => openConfirm('completar', pedido.id)}>
                                                        <Check /> Marcar completado
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => openConfirm('delete', pedido.id)} className="text-destructive">
                                                    <Trash /> Eliminar
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
                            <TableCell colSpan={5}>
                                <Pagination>
                                    <PaginationContent>
                                        {pedidos.links.map((link, idx) => {
                                            const label = link.label;
                                            const isActive = link.active;
                                            const isPrev = label.includes('Previous');
                                            const isNext = label.includes('Next');
                                            return (
                                                <PaginationItem key={idx}>
                                                    {isPrev ? (
                                                        <PaginationPrevious href={link.url || '#'} onClick={(e) => { e.preventDefault(); link.url && router.visit(link.url, { preserveState: true, preserveScroll: true }); }} className={!link.url ? 'opacity-50 pointer-events-none' : ''} />
                                                    ) : isNext ? (
                                                        <PaginationNext href={link.url || '#'} onClick={(e) => { e.preventDefault(); link.url && router.visit(link.url, { preserveState: true, preserveScroll: true }); }} className={!link.url ? 'opacity-50 pointer-events-none' : ''} />
                                                    ) : (
                                                        <PaginationLink href={link.url || '#'} isActive={isActive} onClick={(e) => { e.preventDefault(); link.url && router.visit(link.url, { preserveState: true, preserveScroll: true }); }}>
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
                </Table>
            </Card>

            <ConfirmDialog
                open={showConfirm}
                title={
                    actionType === 'delete'
                        ? '¿Eliminar pedido?'
                        : actionType === 'pendiente'
                        ? 'Marcar pendiente?'
                        : 'Marcar completado?'
                }
                description={
                    actionType === 'delete'
                        ? 'Esta acción eliminará el pedido. No podrás deshacerla.'
                        : actionType === 'pendiente'
                        ? '¿Quieres marcar este pedido como pendiente?'
                        : '¿Quieres marcar este pedido como completado?'
                }
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirm}
            />
        </div>
    )}



    HistorialPage.layout = (page) => (
        <GestionLayout title="Historial">{page}</GestionLayout>
    );
    
    export default HistorialPage;
    