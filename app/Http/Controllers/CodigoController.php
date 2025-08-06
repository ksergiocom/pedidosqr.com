<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Codigo;

class CodigoController extends Controller
{
    public function index()
    {
        $codigos = auth()->user()->codigos;

        return inertia("Gestion/Codigos/IndexPage", [
            "codigos" => $codigos,
        ]);
    }

    public function create()
    {
        $codigos = auth()->user()->codigos;

        return inertia("Gestion/Codigos/CreatePage", [
        ]);
    }

    public function show(Codigo $codigo)
    {
        $ultimosPedidos = $codigo->pedidos()->latest()->limit(5)->get();

        return inertia('Gestion/Codigos/ShowPage', [
            'codigo' => $codigo,
            'ultimosPedidos' => $ultimosPedidos,
        ]);
    }

    public function showPedidoEnCodigo(Request $request, Codigo $codigo)
    {
        $articulos = $codigo->user->articulos;

        return inertia('Codigo/Pedido/CreatePage', [
            'codigo' => $codigo,
            'articulos' => $articulos,
        ]);
    }

    public function gracias(Request $request, Codigo $codigo, Pedido $pedido)
    {
        if($pedido->estado == 'completado'){
            abort(404);
        }

        return inertia('Codigo/GraciasPage', [
            'codigo' => $codigo,
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
                $existe = Codigo::where('user_id', auth()->id())
                    ->where('nombre', $nombre)
                    ->exists();
            } while ($existe);
        } else {
            // 3) Si vino nombre, aseguramos unicidad para este usuario
            Validator::make(
                ['nombre' => $nombre],
                [
                    'nombre' => [
                        Rule::unique('codigos')
                            ->where(fn($q) => $q->where('user_id', auth()->id()))
                    ],
                ],
                ['nombre.unique' => 'Ya tienes una codigo con ese nombre.']
            )->validate();
        }

        // 4) Creamos la codigo con el nombre definitivo
        Codigo::create([
            'nombre' => $nombre,
            'user_id' => auth()->id(),
        ]);

        return redirect()
            ->route('gestion.codigos.index')
            ->with('success', "Codigo “{$nombre}” creada correctamente.");
    }

    public function destroy(Codigo $codigo)
    {
        if ($codigo->pedidos()->exists()) {
            return back()->with('error','No se puede eliminar el código porque tiene pedidos asociados.');
        }

        $codigo->delete();

        return redirect()->back()->with('success', 'Codigo eliminada correctamente.');
    }

    public function edit(Codigo $codigo)
    {
        return inertia("Gestion/Codigos/EditPage", [
            'codigo' => $codigo,
        ]);
    }
    /**
     * 
     * !CHAPUZA!!!!! CUIDADO el UUID no es UUID y lo que hago es comprobar si existe en base de datos.
     * Esto es un ERROR, pero lo dejo asi por ahora
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Codigo $codigo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Codigo $codigo)
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
                $existe = Codigo::where('user_id', auth()->id())
                    ->where('nombre', $nombre)
                    ->exists();
            } while ($existe);
        } else {
            // Si viene nombre, validamos que sea único (ignorando la codigo actual)
            Validator::make(
                ['nombre' => $nombre],
                [
                    'nombre' => [
                        Rule::unique('codigos')
                            ->where(fn($q) => $q->where('user_id', auth()->id()))
                            ->ignore($codigo->id),
                    ],
                ],
                ['nombre.unique' => 'Ya tienes otra codigo con ese nombre.']
            )->validate();
        }

        // 3) Actualizamos la codigo
        $codigo->update(['nombre' => $nombre]);

        return redirect()
            ->route('gestion.codigos.index')
            ->with('success', "Codigo actualizada correctamente. Nuevo nombre: “{$nombre}”");
    }

}
