import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// Función para abrir QR en nueva ventana, recibe id de mesa
export const openQrFullScreen = (mesa, qrRefs) => {
  const svgNode = qrRefs.current[mesa.id];
  if (!svgNode) return;

  // Clonamos el SVG y extraemos su outerHTML
  const svgHtml = svgNode.outerHTML;

  // HTML para la nueva ventana, centrado y con tamaño 80% viewport
  const html = `
      <html>
      <head>
        <title>QR Mesa ${mesa.nombre}</title>
        <style>
          html, body {
            margin: 0; padding: 0; height: 100vh; width: 100vw;
            display: flex; justify-content: center; align-items: center;
            background: white;
          }
          svg {
            width: 80vmin;
            height: 80vmin;
          }
        </style>
      </head>
      <body>
        ${svgHtml}
      </body>
      </html>
    `;

  // Abrimos ventana nueva con el contenido generado
  const newWindow = window.open("", "_blank", "width=500,height=500");
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
};


export function calcularTotalPedido(detalles) {
  return detalles.reduce(
    (acc, detalle) => acc + detalle.cantidad * detalle.articulo.precio,
    0
  );
}


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


export function truncarTexto(texto, max = 250) {
  if (typeof texto !== 'string') return '';
  if (texto.length <= max) return texto;
  return texto.slice(0, max).trimEnd() + '...';
}
