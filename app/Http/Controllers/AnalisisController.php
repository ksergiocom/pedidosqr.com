<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Pedido;

class AnalisisController extends Controller
{
    public function historial(Request $request)
    {
        $query = auth()->user()->pedidos()
            ->with(['detalles.articulo', 'codigo'])
            ->orderBy('created_at', 'desc');

        // Filtro por estado
        if ($request->filled('estado') && $request->estado !== 'todos') {
            $query->where('estado', $request->estado);
        }

        // Filtro por fechas
        if ($request->filled('desde')) {
            $query->whereDate('pedidos.created_at', '>=', $request->desde);
        }

        if ($request->filled('hasta')) {
            $query->whereDate('pedidos.created_at', '<=', $request->hasta);
        }

        $pedidos = $query->paginate()->withQueryString(); // conserva filtros en paginación

        return inertia('Analisis/HistorialPage', [
            'pedidos' => $pedidos,
            'filtros' => [
                'estado' => $request->estado ?? 'todos',
                'desde' => $request->desde,
                'hasta' => $request->hasta,
            ],
        ]);
    }

    public function estadisticas(){
        return inertia('Analisis/EstadisticasPage');
    }

}
