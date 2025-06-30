<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Pedido;

class AnalisisController extends Controller
{
public function pedidos()
{
    $pedidos = auth()->user()->pedidos()->with(['detalles.articulo', 'mesa'])->get();

    return inertia('Analisis/PedidosPage', [
        'pedidos' => $pedidos,
    ]);
}

}
