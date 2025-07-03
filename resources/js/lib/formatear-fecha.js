export function formatearFechaHora(fechaISO) {
  const date = new Date(fechaISO);

  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  // const dia = String(date.getDate()).padStart(2, '0');
  // const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
  // const año = String(date.getFullYear()).slice(-2); // últimos 2 dígitos

  // Solo hora
  return `${horas}:${minutos} `;
  // return `${horas}:${minutos} ${dia}-${mes}-${año}`;
}


export function formatearFechaCompleto(fechaISO) {
  const date = new Date(fechaISO);

  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
  const año = String(date.getFullYear()).slice(-2); // últimos 2 dígitos

  return `${horas}:${minutos} ${dia}-${mes}-${año}`;
}


export function minutosTranscurridos(fechaISO) {
  const fechaPedido = new Date(fechaISO);
  const ahora = new Date();

  const diffMs = ahora - fechaPedido; // diferencia en milisegundos
  const diffMin = diffMs / (1000 * 60); // convertir a minutos

  return diffMin;
}