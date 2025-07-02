import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';
import { router, Link } from '@inertiajs/react';
import CardArticulo from '@/components/CardArticulo';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Title from '@/components/Title';

const EditPedidoEnMesa = ({ articulos, mesa, pedido }) => {
  const [cantidades, setCantidades] = useState(() => {
    const inicial = {};
    articulos.forEach((art) => {
      const detalle = pedido.detalles.find((d) => d.articulo_id === art.id);
      inicial[art.id] = detalle ? detalle.cantidad : 0;
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
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const disminuir = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  const actualizarPedido = () => {
    const articulosSeleccionados = Object.fromEntries(
      Object.entries(cantidades).filter(([_, cantidad]) => cantidad > 0)
    );

    if (Object.keys(articulosSeleccionados).length === 0) {
      alert('Debes tener al menos un artículo en el pedido.');
      return;
    }

    router.put(`/${mesa.id}/${pedido.id}`, {
      articulos: articulosSeleccionados,
    });
  };

  return (
    <>
      <main className="p-5 w-full max-w-2xl mx-auto">
        <Title className="text-center">Editar pedido</Title>

        <div className="grid grid-cols-1 gap-10 mt-7 sm:mt-10">
          {articulos.map((articulo) => (
            <div className="flex items-center gap-5" key={articulo.id}>
              <CardArticulo
                art={articulo}
                options={false}
                className={`h-max sm:h-full transition ${
                  cantidades[articulo.id] > 0 ? 'shadow-xl/10 scale-101' : ''
                }`}>

                  <div className="flex mt-5 items-center gap-2">
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
                      className={`transition ${
                        cantidades[articulo.id] < 1 ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <ArrowDown />
                    </Button>

                    <span
                      className={`ml-3 transition-opacity duration-300 ${
                        cantidades[articulo.id] > 0
                          ? 'opacity-100 text-black'
                          : 'opacity-0'
                      }`}
                    >
                      <Badge className="text-md font-semibold mr-2 bg-green-500">
                        <CheckCircle className="mr-2" />
                        {cantidades[articulo.id]} <span>Pedidos</span>
                      </Badge>
                    </span>
                  </div>
                
              </CardArticulo>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-15 mb-10 text-center">
          Puedes volver a editar o cancelar tu pedido en cualquier momento.
        </p>
      </main>

      <footer className="mx-auto sticky bottom-0 bg-white border-t px-5 p-3 sm:p-5">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground font-thin">
              Articulo(s):{' '}
              <strong className="text-black font-bold">{cantidadTotal}</strong>
            </p>
            <p className="text-sm text-muted-foreground font-thin">
              Total:{' '}
              <strong className="text-black font-bold">
                {importeTotal.toFixed(2)}€
              </strong>
            </p>
          </div>
          <div className="flex gap-4 mt-2 sm:mt-4 mb-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1 w-1/2">Actualizar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Confirmar actualización?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Estás a punto de actualizar tu pedido. Puedes editar o
                    cancelar tu pedido en cualquier momento.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={actualizarPedido}>
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link href={`/${mesa.id}/${pedido.id}`} className="w-1/2">
              <Button variant="outline" className="w-full">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default EditPedidoEnMesa;
