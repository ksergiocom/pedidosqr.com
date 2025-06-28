import React, { useState, useMemo } from 'react';
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { router } from '@inertiajs/react';

const PedidoEnMesa = ({ articulos, mesa }) => {
    const [cantidades, setCantidades] = useState(() => {
        const inicial = {};
        articulos.forEach(art => {
            inicial[art.id] = 0;
        });
        return inicial;
    });

    const cantidadTotal = useMemo(() => {
        return Object.values(cantidades).reduce((acc, val) => acc + val, 0);
    }, [cantidades]);

    const importeTotal = useMemo(() => {
        return articulos.reduce((total, articulo) => {
            const cantidad = cantidades[articulo.id] || 0;
            return total + cantidad * articulo.precio;
        }, 0);
    }, [cantidades, articulos]);


    const aumentar = (id) => {
        setCantidades(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const disminuir = (id) => {
        setCantidades(prev => ({
            ...prev,
            [id]: Math.max(prev[id] - 1, 0)
        }));
    };

    const hacerPedido = () => {
        const articulosSeleccionados = Object.fromEntries(
            Object.entries(cantidades).filter(([_, cantidad]) => cantidad > 0)
        );

        if (Object.keys(articulosSeleccionados).length === 0) {
            alert('Selecciona al menos un artículo.');
            return;
        }

        router.post(`/${mesa.id}/pedir`, {
            articulos: articulosSeleccionados
        });
    };

    return (
        <main className="p-5">
            <h1>¡Haz tu pedido!</h1>
            <h3 className="mt-5">Tu mesa es {mesa.id}</h3>
            <Table className="mt-7">
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articulos.map(articulo => (
                        <TableRow key={articulo.id}>
                            <TableCell>{articulo.nombre}</TableCell>
                            <TableCell>{articulo.precio.toFixed(2)}€</TableCell>
                            <TableCell className="flex gap-3 items-center justify-end">
                                <span
                                    className={`mr-7 transition-opacity duration-200 ${
                                        cantidades[articulo.id] > 0 ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    >
                                    Pedidos: {cantidades[articulo.id]}
                                    </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => aumentar(articulo.id)}
                                >
                                    <ArrowUp />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => disminuir(articulo.id)}
                                >
                                    <ArrowDown />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="mt-8 flex justify-between items-center">
                <p className="text-lg">Total artículos: {cantidadTotal}</p>
                <p className="text-lg">Importe total: {importeTotal.toFixed(2)}€</p>
            </div>
            <Button className='w-full mt-10' onClick={hacerPedido}>Hacer pedido</Button>
        </main>
    );
};

export default PedidoEnMesa;
