@extends('layout')


@section('main')

    @forelse ($pedidos as $pedido)
        <div>
            <h3>Pedido {{ $pedido->id }}</h3>
            <p>Mesa {{ $pedido->mesa }}</p>
            <p>Fecha: {{ $pedido->created_at->format('d-m-Y H:i') }}</p>

            {{-- Formulario para eliminar --}}
            <form action="{{ route('gestion.pedidos.destroy', $pedido) }}" method="POST" style="display:inline-block"
                onsubmit="return confirm('¿Estás seguro de eliminar este pedido?')">
                @csrf
                @method('DELETE')
                <button type="submit">Eliminar pedido</button>
            </form>

            @if ($pedido->detalles->isNotEmpty())
                <table>
                    <thead>
                        <tr>
                            <th>Artículo</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($pedido->detalles as $detalle)
                            <tr>
                                <td>{{ $detalle->articulo->nombre ?? 'Artículo eliminado' }}</td>
                                <td>{{ $detalle->articulo->precio ?? '-' }} €</td>
                                <td>{{ $detalle->cantidad }}</td>
                                <td>
                                    @php
                                        $precio = $detalle->articulo->precio ?? 0;
                                        echo number_format($precio * $detalle->cantidad, 2) . ' €';
                                    @endphp
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <p><em>Este pedido no tiene artículos.</em></p>
            @endif
            <hr>
        </div>
    @empty
        <p>No hay pedidos para esta mesa.</p>
    @endforelse

@endsection

@push('scripts')
  @vite('resources/js/echo.js')
@endpush