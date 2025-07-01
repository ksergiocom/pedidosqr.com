import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


   // Función para abrir QR en nueva ventana, recibe id de mesa
export  const openQrFullScreen = (mesa, qrRefs) => {
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