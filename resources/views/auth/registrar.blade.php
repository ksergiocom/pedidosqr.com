@extends('layout')

@section('main')
    <h1>Pagina Registrar</h1>
    <form action="" method="POST">
        @csrf
        <input type="text" placeholder="Usuario" name="email" value="{{ old('email') }}">
        @error('email')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        <input type="password" placeholder="Contraseña" name="password">
        @error('password')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        <input type="password" name="password_confirmation" placeholder="Confirmar contraseña">
        
        <input type="submit" value="Registrar">
    </form>
@endsection