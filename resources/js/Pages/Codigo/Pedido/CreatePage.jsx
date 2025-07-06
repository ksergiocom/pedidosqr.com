import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Check, CheckCircle, Minus, Plus } from 'lucide-react';
import { router } from '@inertiajs/react';
import CardArticulo from '@/components/CardArticulo';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import Title from '@/components/Title';


const PedidoEnCodigo = ({ articulos, codigo }) => {
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

    const articulosSeleccionados = useMemo(() => {
  return articulos
    .filter(art => cantidades[art.id] > 0)
    .map(art => ({
      ...art,
      cantidad: cantidades[art.id],
    }));
}, [cantidades, articulos]);

    const hacerPedido = () => {
        const articulosSeleccionados = Object.fromEntries(
            Object.entries(cantidades).filter(([_, cantidad]) => cantidad > 0)
        );

        router.post(`/${codigo.id}/pedir`, {
            articulos: articulosSeleccionados
        });
    };

    return (
        <>
            <main className="p-5 mx-auto max-w-2xl">
                <Title className='text-center'>¡Haz tu pedido!</Title>
                {/* <p className="text-xl mt-5 text-center">Elige lo que quieres tomar y pulsa <strong>“Hacer pedido”</strong>.</p>
                <p className="text-xl mt-2 text-center">¡Te atenderemos al instante!</p> */}

 
                <div className="grid grid-cols-1 gap-10 mt-7 sm:mt-10 place-items-start items-stretch">

                    {articulos.map(articulo => (
                        <div className='flex w-full items-center gap-5' key={articulo.id}>
                            <CardArticulo art={articulo} options={false} className={` w-full sm:h-full transition ${cantidades[articulo.id] > 0 ? 'shadow-xl/10' : ''
                                }`}>
                                <div className="flex mt-5 items-center gap-2">
                                    <Button
                                        className=''
                                        variant="outline"
                                        size="icon"
                                        onClick={() => aumentar(articulo.id)}
                                    >
                                        <ArrowUp className='' />
                                    </Button>


                                    <Button
                                        className={`transition ${cantidades[articulo.id] < 1 ? 'opacity-0' : 'opacity-100'}`}
                                        variant="outline"
                                        size="icon"
                                        onClick={() => disminuir(articulo.id)}
                                    // disabled={cantidades[articulo.id] < 1}
                                    >
                                        <ArrowDown className='' />
                                    </Button>
                                    <span
                                        className={`ml-3 transition-opacity duration-300 ${cantidades[articulo.id] > 0
                                            ? 'opacity-100 text-black'      // visible y color principal cuando cantidad > 0
                                            : 'opacity-0'    // opaco y color muted cuando cantidad == 0
                                            }`}
                                    >
                                        <Badge className='text-md font-semibold mr-2 bg-green-500'><CheckCircle className='mr-2' />{cantidades[articulo.id]} <span className=''>Pedidos</span></Badge>
                                    </span>
                                </div>
                            </CardArticulo>

                        </div>
                    ))}
                </div>

                {/* <Separator className='mt-8 mb-5' /> */}

                <p className="text-xs text-muted-foreground mt-15 mb-10 text-center">
                    ¿Te equivocaste al elegir? ¡No pasa nada! Puedes editar o cancelar tu pedido en cualquier momento una vez realizado.
                </p>

            </main>
            <footer className='mx-auto sticky bottom-0 bg-white border-t px-5 p-3 sm:p-5'>
                <div className='max-w-lg mx-auto'>

                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground font-thin">Articulo(s): <strong className='text-black font-bold'>{cantidadTotal}</strong></p>
                        <p className="text-sm text-muted-foreground font-thin">Total: <strong className='text-black font-bold'>{importeTotal.toFixed(2)}€</strong></p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button disabled={cantidadTotal<1} className='w-full mt-2 sm:mt-4 mb-2'>Hacer pedido</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Confirmar pedido?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Puedes editar o cancelar tu pedido en cualquier momento una vez realizado
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={hacerPedido}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </footer>
            <AlertDialog>
                <AlertDialogTrigger asChild>

                </AlertDialogTrigger>
            </AlertDialog>
        </>
    );
};

export default PedidoEnCodigo;
