<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Mesa: {{ $mesa->id }}</h1>
    <ul>
        @foreach ($articulos as $articulo)
            <li>{{ $articulo->nombre }}</li>
        @endforeach
    </ul>
    <form method="POST" action="{{ route('mesa.pedir', $mesa->id) }}">
        @csrf
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($articulos as $articulo)
                    <tr>
                        <td>{{ $articulo->nombre }}</td>
                        <td>{{ $articulo->precio }}</td>
                        <td>
                            <input type="number" name="articulos[{{ $articulo->id }}]" min="0" value="0">
                        </td>
                        <td>opt</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <button type="submit">Enviar pedido</button>
    </form>

</body>
</html>