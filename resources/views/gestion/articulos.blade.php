@extends('layout')

@section('main')
    <h1>Gestión articulos</h1>
    <h3>Listado de articulos disponibles</h3>
    <ul>
        @foreach ($articulos as $articulo)
            <li>
            {{ $articulo }}

            <form action="{{ route('gestion.articulos.eliminar', $articulo) }}" method="POST" style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro que quieres eliminar esta articulo?')">
                    Eliminar
                </button>
            </form>
        </li>
        @endforeach
    </ul>
    <hr>
    <h3>Agregar nuevo articulo</h3>
    <form action="{{ route('gestion.articulos.crear') }}" method="POST">
        @csrf
        <input type="text" name="nombre" value="{{ old('nombre') }}">
        @error('nombre')
            <div class="text-danger">{{ $message }}</div>
        @enderror
        <textarea name="descripcion">{{ old('descripcion') }}</textarea>
        @error('descripcion')
            <div class="text-danger">{{ $message }}</div>
        @enderror
        <input type="number" name="precio" value="{{ old('precio') }}">
        @error('precio')
            <div class="text-danger">{{ $message }}</div>
        @enderror
        <input type="submit" value="Crear">
    </form>

@endsection