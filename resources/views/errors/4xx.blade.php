@extends('layout')

@section('title', 'PedidosQR - Error 4xx')

@section('main')
<section id="error-4xx" class="flex flex-col gap-2 items-start p-5">
  <h2 class="text-4xl font-bold text-red-600">¡Ups! Error 4xx</h2>
  <p class="text-lg">La solicitud no puede ser procesada correctamente. Puede deberse a permisos o datos incorrectos.</p>
  <a href="/" class="mt-4 underline text-blue-500 hover:text-blue-700">Volver al inicio</a>
</section>
@endsection
