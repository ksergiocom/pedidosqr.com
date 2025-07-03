export function truncarTexto(texto, max = 250) {
  if (typeof texto !== 'string') return '';
  if (texto.length <= max) return texto;
  return texto.slice(0, max).trimEnd() + '...';
}
