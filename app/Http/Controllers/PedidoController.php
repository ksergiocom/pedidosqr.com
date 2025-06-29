<?php

namespace App\Http\Controllers;

use App\Events\PedidoCreado;
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

        return inertia('Gestion/Pedidos/IndexPage', [
            'pedidos' => $pedidos,
        ]);
    }

    public function pedirPedidoEnMesa(Request $request, Mesa $mesa)
    {
        $articulos = $request->input('articulos', []);

        $pedido = DB::transaction(function () use ($mesa, $articulos) {
            $pedido = Pedido::create(['mesa_id' => $mesa->id]);

            foreach ($articulos as $articuloId => $cantidad) {
                if ($cantidad > 0) {
                    PedidoDetalle::create([
                        'pedido_id' => $pedido->id,
                        'articulo_id' => $articuloId,
                        'cantidad' => $cantidad,
                    ]);
                }
            }

            return $pedido;
        });

        // Aquí la transacción ya se ha completado
        DB::afterCommit(function () use ($pedido) {
            $pedido->load(['mesa', 'detalles.articulo']); // Cargar relaciones
            broadcast(new PedidoCreado($pedido));
        });

        return redirect()->route('pedidoEnMesa.gracias', [
            'mesa' => $mesa,
            'pedido' => $pedido,
        ])->with('success', '¡Pedido creado con éxito!');
    }

    public function edit(Mesa $mesa, Pedido $pedido){
        $articulos = $mesa->user->articulos;

        $pedido->load(['detalles.articulo']);

        return inertia('Mesa/Pedido/EditPage',[
            'mesa' => $mesa,
            'pedido' => $pedido,
            'articulos' => $articulos,
        ]);
    }

    public function update(Request $request, Mesa $mesa, Pedido $pedido)
    {
        $articulos = $request->input('articulos', []);

        // Autorización opcional
        if ($pedido->mesa_id !== $mesa->id || $pedido->mesa->user_id !== auth()->id()) {
            abort(403);
        }

        DB::transaction(function () use ($pedido, $articulos) {
            // Borrar los detalles antiguos
            $pedido->detalles()->delete();

            // Crear los nuevos
            foreach ($articulos as $articuloId => $cantidad) {
                if ($cantidad > 0) {
                    PedidoDetalle::create([
                        'pedido_id' => $pedido->id,
                        'articulo_id' => $articuloId,
                        'cantidad' => $cantidad,
                    ]);
                }
            }
        });

        // O puedes emitir un evento de actualización si lo necesitas
        return redirect()->route('pedidoEnMesa.gracias', [
            'mesa' => $mesa,
            'pedido' => $pedido,
        ])->with('success', '¡Pedido actualizado con éxito!');
    }

    public function destroy(Pedido $pedido)
    {
        // Puedes validar si el usuario es dueño del pedido a través de la mesa
        if ($pedido->mesa->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para eliminar este pedido.');
        }

        $pedido->detalles()->delete(); // Eliminar detalles primero si no hay cascade
        $pedido->delete();

        return back()->with('success', 'Se ha eliminado el pedido correctamente');
    }

    public function cancelar(Mesa $mesa, Pedido $pedido)
    {
        // Puedes validar si el usuario es dueño del pedido a través de la mesa
        if ($pedido->mesa->id != $mesa->id) {
            abort(403, 'No tienes permiso para eliminar este pedido.');
        }

        $pedido->detalles()->delete(); // Eliminar detalles primero si no hay cascade
        $pedido->delete();

        return back()->with('success', 'Se ha eliminado el pedido correctamente');
    }
}
