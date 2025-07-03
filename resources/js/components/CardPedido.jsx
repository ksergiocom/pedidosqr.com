import React, {useMemo} from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calcularTotalPedido, formatearFechaHora, minutosTranscurridos } from "@/lib/utils";

const CardPedido = ({ pedido, mesa, className = "" }) => {

    const totalObjetos = useMemo(() => {
        return pedido.detalles.reduce((acc, detalle) => acc + detalle.cantidad, 0);
    }, [pedido.detalles]);

    return (
        <Card key={pedido.id} className={`my-5 p-2 ${className}`}>
            <CardContent>
                <div className="flex justify-between items-center w-full mb-2 mt-5 text-xs xl:text-base">
                    <span className="text-xs sm:text-base">
                        {mesa?.nombre}
                        <Badge
                            className="ml-5 text-xs"
                            variant={
                                minutosTranscurridos(pedido.updated_at) > 5
                                    ? "destructive"
                                    : "secondary"
                            }
                        >
                            {formatearFechaHora(pedido.updated_at)}h
                        </Badge>
                    </span>
                    <span className="font-semibold hidden sm:inline text-base">
                        {totalObjetos} <span className="font-normal text-xs sm:text-sm"> artículo(s)</span>
                    </span>
                </div>

                <Separator className="mt-4" />

                <div className="flex flex-col gap-3 p-2 mb-5 mt-7">
                    {pedido.detalles.map((detalle, idx) => (
                        <div
                            key={detalle.id}
                            className={`flex justify-between items-center pb-2 ${idx !== pedido.detalles.length - 1 ? "border-b" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {detalle.articulo.image_url ? (
                                    <img
                                        src={detalle.articulo.image_url}
                                        alt={detalle.articulo.nombre}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-muted text-xs flex items-center justify-center rounded text-muted-foreground">
                                        Sin imagen
                                    </div>
                                )}
                                <div className="text-xs sm:text-base font-medium">
                                    {detalle.cantidad} x {detalle.articulo.nombre}
                                </div>
                            </div>

                            <div className="text-right text-xs sm:text-base">
                                <div>
                                    {detalle.cantidad} × {detalle.articulo.precio}€
                                </div>
                                <div className="font-semibold">
                                    {(detalle.cantidad * detalle.articulo.precio).toFixed(2)}€
                                </div>
                            </div>
                        </div>
                    ))}

                    <Separator className="mt-3 sm:mt-5 mb-5" />

                    <div className="flex-1 sm:flex-none flex items-center justify-end">
                        <p className="text-2xl font-bold text-center sm:text-right w-full sm:w-auto">
                            Total: {calcularTotalPedido(pedido.detalles).toFixed(2)}€
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPedido;
