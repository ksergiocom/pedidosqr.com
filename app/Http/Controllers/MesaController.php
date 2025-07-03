<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Mesa;

class MesaController extends Controller
{
    public function index()
    {
        $mesas = auth()->user()->mesas;

        return inertia("Gestion/Mesas/IndexPage", [
            "mesas" => $mesas,
        ]);
    }

    public function create()
    {
        $mesas = auth()->user()->mesas;

        return inertia("Gestion/Mesas/CreatePage", [
        ]);
    }

    public function show(Mesa $mesa)
    {
        $ultimosPedidos = $mesa->pedidos()->latest()->limit(5)->get();

        return inertia('Gestion/Mesas/ShowPage', [
            'mesa' => $mesa,
            'ultimosPedidos' => $ultimosPedidos,
        ]);
    }

    public function showPedidoEnMesa(Request $request, Mesa $mesa)
    {
        $articulos = $mesa->user->articulos;

        return inertia('Mesa/Pedido/CreatePage', [
            'mesa' => $mesa,
            'articulos' => $articulos,
        ]);
    }

    public function gracias(Request $request, Mesa $mesa, Pedido $pedido)
    {
        return inertia('Mesa/GraciasPage', [
            'mesa' => $mesa,
            'pedido' => $pedido,
        ]);
    }
    /**
     *  * !CHAPUZA!!!!! CUIDADO el UUID no es UUID y lo que hago es comprobar si existe en base de datos.
     * Esto es un ERROR, pero lo dejo asi por ahora
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // 1) Validamos: nombre opcional, max 20 chars si viene
        $validated = Validator::make($request->all(), [
            'nombre' => ['nullable', 'string', 'max:20'],
        ])->validate();

        // 2) Si no vino nombre, generamos uno corto y comprobamos colisión
        $nombre = $validated['nombre'] ?? null;

        if (!$nombre) {
            do {
                // 8 chars alfanuméricos aleatorios
                $nombre = Str::random(8);
                $existe = Mesa::where('user_id', auth()->id())
                    ->where('nombre', $nombre)
                    ->exists();
            } while ($existe);
        } else {
            // 3) Si vino nombre, aseguramos unicidad para este usuario
            Validator::make(
                ['nombre' => $nombre],
                [
                    'nombre' => [
                        Rule::unique('mesas')
                            ->where(fn($q) => $q->where('user_id', auth()->id()))
                    ],
                ],
                ['nombre.unique' => 'Ya tienes una mesa con ese nombre.']
            )->validate();
        }

        // 4) Creamos la mesa con el nombre definitivo
        Mesa::create([
            'nombre' => $nombre,
            'user_id' => auth()->id(),
        ]);

        return redirect()
            ->route('gestion.mesas.index')
            ->with('success', "Mesa “{$nombre}” creada correctamente.");
    }

    public function destroy(Mesa $mesa)
    {

        $mesa->delete();

        return redirect()->back()->with('success', 'Mesa eliminada correctamente.');
    }

    public function edit(Mesa $mesa)
    {
        return inertia("Gestion/Mesas/EditPage", [
            'mesa' => $mesa,
        ]);
    }
    /**
     * 
     * !CHAPUZA!!!!! CUIDADO el UUID no es UUID y lo que hago es comprobar si existe en base de datos.
     * Esto es un ERROR, pero lo dejo asi por ahora
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Mesa $mesa
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Mesa $mesa)
    {
        // 1) Validamos: nombre opcional, max 20 chars
        $validated = Validator::make($request->all(), [
            'nombre' => ['nullable', 'string', 'max:20'],
        ])->validate();

        // 2) Determinamos el nombre final
        $nombre = $validated['nombre'] ?? null;

        if (!$nombre) {
            // Si no viene nombre, generamos uno corto y comprobamos colisiones
            do {
                $nombre = Str::random(8);
                $existe = Mesa::where('user_id', auth()->id())
                    ->where('nombre', $nombre)
                    ->exists();
            } while ($existe);
        } else {
            // Si viene nombre, validamos que sea único (ignorando la mesa actual)
            Validator::make(
                ['nombre' => $nombre],
                [
                    'nombre' => [
                        Rule::unique('mesas')
                            ->where(fn($q) => $q->where('user_id', auth()->id()))
                            ->ignore($mesa->id),
                    ],
                ],
                ['nombre.unique' => 'Ya tienes otra mesa con ese nombre.']
            )->validate();
        }

        // 3) Actualizamos la mesa
        $mesa->update(['nombre' => $nombre]);

        return redirect()
            ->route('gestion.mesas.index')
            ->with('success', "Mesa actualizada correctamente. Nuevo nombre: “{$nombre}”");
    }

}
