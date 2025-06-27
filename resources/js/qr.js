// resources/js/qr.js
import { renderSVG } from 'uqr';

document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los botones de QR
  document.querySelectorAll('.btn-generate-qr').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.getAttribute('data-content');
      // Genera el SVG del QR
      const svg = renderSVG(content,{pixelSize:8});

      // Abre una pestaña nueva
      const w = window.open('', '_blank');
      if (!w) {
        return alert('Por favor permite ventanas emergentes para este sitio.');
      }
      // Escribe el SVG directamente en el documento de la nueva pestaña
      w.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>QR de ${content}</title>
          <style>
            body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          </style>
        </head>
        <body>
          ${svg}
        </body>
        </html>
      `);
      w.document.close();
    });
  });
});
