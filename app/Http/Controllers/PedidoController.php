<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Codigo;

use App\Events\PedidoCreado;
use App\Events\PedidoCancelado;
use App\Events\PedidoActualizado;

class PedidoController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $pedidos = $user->pedidos()
            ->where('estado', '=', 'pendiente')
            ->with(['codigo', 'detalles.articulo'])
            ->latest()
            ->get();

        return inertia('Gestion/Pedidos/IndexPage', [
            'pedidos' => $pedidos,
        ]);
    }

    public function pedirPedidoEnCodigo(Request $request, Codigo $codigo)
    {
        $articulos = $request->input('articulos', []);

        $pedido = DB::transaction(function () use ($codigo, $articulos) {
            $pedido = Pedido::create(['codigo_id' => $codigo->id]);

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
            $pedido->load(['codigo', 'detalles.articulo']); // Cargar relaciones
            broadcast(new PedidoCreado($pedido));
        });

        return redirect()->route('pedidoEnCodigo.gracias', [
            'codigo' => $codigo,
            'pedido' => $pedido,
        ])->with('success', '¡Pedido creado con éxito!');
    }

    public function edit(Codigo $codigo, Pedido $pedido)
    {
        $articulos = $codigo->user->articulos;

        $pedido->load(['detalles.articulo']);

        return inertia('Codigo/Pedido/EditPage', [
            'codigo' => $codigo,
            'pedido' => $pedido,
            'articulos' => $articulos,
        ]);
    }

    public function update(Request $request, Codigo $codigo, Pedido $pedido)
    {
        $articulos = $request->input('articulos', []);

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

        // Emitir después de commit
        DB::afterCommit(function () use ($pedido) {
            $pedido->load(['codigo', 'detalles.articulo']);
            broadcast(new PedidoActualizado($pedido));
        });

        // O puedes emitir un evento de actualización si lo necesitas
        return redirect()->route('pedidoEnCodigo.gracias', [
            'codigo' => $codigo,
            'pedido' => $pedido,
        ])->with('success', '¡Pedido actualizado con éxito!');
    }

    public function destroy(Pedido $pedido)
    {
        if ($pedido->codigo->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para eliminar este pedido.');
        }

        $userId = $pedido->codigo->user_id;
        $pedidoId = $pedido->id;

        $pedido->detalles()->delete();
        $pedido->delete();

        // Emitir evento broadcast de cancelación
        broadcast(new PedidoCancelado($pedidoId, $userId));

        return back()->with('success', 'Se ha eliminado el pedido correctamente');
    }

    public function cancelar(Codigo $codigo, Pedido $pedido)
    {
        if ($pedido->codigo->id != $codigo->id) {
            abort(403, 'No tienes permiso para eliminar este pedido.');
        }

        $userId = $pedido->codigo->user_id;
        $pedidoId = $pedido->id;

        $pedido->detalles()->delete();
        $pedido->delete();

        // Emitir evento broadcast de cancelación
        broadcast(new PedidoCancelado($pedidoId, $userId));

        return redirect()->route('pedidoEnCodigo.show', ['codigo' => $codigo])->with('success', 'Se ha eliminado el pedido correctamente');
    }

    public function show(Pedido $pedido)
    {
        if ($pedido->codigo->user_id !== auth()->id()) {
            abort(403, 'No tienes permisos para ver esta pedido');
        }

        $pedido->load(['detalles.articulo', 'codigo']);

        return inertia('Gestion/Pedidos/ShowPage', [
            'pedido' => $pedido,
        ]);
    }

    public function completar(Pedido $pedido)
    {
        if ($pedido->codigo->user_id !== auth()->id()) {
            abort(403, 'No tienes permisos para modificar el estado de este pedido');
        }

        $pedido->estado = 'completado';
        $pedido->save();

        return redirect()->back()->with('success', 'Se ha marcado el pedido como completado');
    }

    public function pendiente(Pedido $pedido)
    {
        if ($pedido->codigo->user_id !== auth()->id()) {
            abort(403, 'No tienes permisos para modificar el estado de este pedido');
        }

        $pedido->estado = 'pendiente';
        $pedido->save();

        return redirect()->back()->with('success', 'Se ha marcado el pedido como pendiente');
    }
}
