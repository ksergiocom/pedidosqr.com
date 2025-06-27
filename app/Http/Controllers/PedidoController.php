<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Mesa;

use App\Events\PedidoRealizado;

class PedidoController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $pedidos = $user->pedidos()
            ->with(['mesa', 'detalles.articulo'])
            ->latest()
            ->get();

        return view('gestion.pedidos', [
            'pedidos' => $pedidos,
        ]);
    }

    public function pedir(Request $request, Mesa $mesa)
    {
        $articulos = $request->input('articulos', []);

        DB::transaction(function () use ($mesa, $articulos) {
            // Crear el pedido primero
            $pedido = Pedido::create([
                'mesa_id' => $mesa->id,
            ]);

            foreach ($articulos as $articuloId => $cantidad) {
                if ($cantidad > 0) {
                    PedidoDetalle::create([
                        'pedido_id'   => $pedido->id,
                        'articulo_id' => $articuloId,
                        'cantidad'    => $cantidad,
                    ]);
                }
            }
        });

        return back()->with('success', 'Pedido y detalles creados correctamente.');
    }


    public function destroy(Pedido $pedido){
            // Puedes validar si el usuario es dueño del pedido a través de la mesa
        if ($pedido->mesa->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para eliminar este pedido.');
        }

        $pedido->detalles()->delete(); // Eliminar detalles primero si no hay cascade
        $pedido->delete();

        return back()->with('success','Se ha eliminado el pedido correctamente');
    }
}
