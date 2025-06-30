export function calcularTotalPedido(detalles) {
  return detalles.reduce(
    (acc, detalle) => acc + detalle.cantidad * detalle.articulo.precio,
    0
  );
}
