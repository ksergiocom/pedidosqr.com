import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, CheckCircle } from 'lucide-react';
import { router } from '@inertiajs/react';
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
import { Link } from '@inertiajs/react';

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
      <main className="p-5 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center">Editar pedido</h1>
        <p className="text-xl mt-5 text-center">
          Modifica las cantidades y pulsa <strong>“Actualizar pedido”</strong>.
        </p>

        <div className="grid grido-cols-1 xl:grid-cols-2 gap-10 mt-10">
          {articulos.map((articulo) => (
            <div className="flex items-center gap-5" key={articulo.id}>
              <CardArticulo
                art={articulo}
                options={false}
                className={`h-max sm:h-full transition ${
                  cantidades[articulo.id] > 0 ? 'shadow-xl/10 scale-103' : ''
                }`}
              >
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

      <footer className="mx-auto sticky bottom-0 bg-white border-t p-5">
        <div className="max-w-lg mx-auto flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex-1">Actualizar pedido</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Confirmar actualización?</AlertDialogTitle>
                <AlertDialogDescription>
                  Estás a punto de actualizar tu pedido. Puedes editar o cancelar
                  tu pedido en cualquier momento.
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

          <Link href={`/${mesa.id}/${pedido.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Volver al pedido
            </Button>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default EditPedidoEnMesa;
