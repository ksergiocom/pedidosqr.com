@extends('layout')

@section('title', 'PedidosQR - Error 5xx')

@section('main')
<section id="error-5xx" class="flex flex-col gap-2 items-start p-5">
  <h2 class="text-4xl font-bold text-red-600">Error interno del servidor</h2>
  <p class="text-lg">Ha ocurrido un problema inesperado. Estamos trabajando para solucionarlo lo antes posible.</p>
  <a href="/" class="mt-4 underline text-blue-500 hover:text-blue-700">Volver al inicio</a>
</section>
@endsection
