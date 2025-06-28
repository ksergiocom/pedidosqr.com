<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Articulo;


class ArticuloController extends Controller
{
    public function index()
    {
        $articulos = auth()->user()->articulos;

        return inertia("Gestion/Articulos/IndexPage", [
            "articulos" => $articulos,
        ]);
    }

    public function create()
    {
        return inertia('Gestion/Articulos/CreatePage');
    }

    public function edit(Articulo $articulo)
    {
        return inertia('Gestion/Articulos/EditPage', [
            'articulo' => $articulo,
        ]);
    }

    public function update(Request $request, Articulo $articulo)
    {
        $validated = Validator::make($request->all(), [
            'nombre' => [
                'required',
                Rule::unique('articulos')->where(function ($query) use ($articulo) {
                    return $query->where('user_id', auth()->id());
                })->ignore($articulo->id),
            ],
            'descripcion' => ['nullable'],
            'precio' => ['numeric', 'decimal:0,2']
        ], [
            'nombre.unique' => 'Ya tienes un artículo con ese nombre.',
        ])->validate();

        $articulo->update([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'],
            'precio' => $validated['precio'],
        ]);

        return redirect()->route('gestion.articulos.index')->with('success', 'Artículo actualizado correctamente.');
    }

    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'nombre' => [
                'required',
                Rule::unique('articulos')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                }),
            ],
            'descripcion' => ['nullable'],
            'precio' => ['numeric', 'decimal:0,2']
        ], [
            'nombre.unique' => 'Ya tienes un articulo con ese nombre.',
        ])->validate();

        Articulo::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'],
            'precio' => $validated['precio'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('gestion.articulos.index')->with('success', 'Artículo creada correctamente.');
    }

    public function destroy(Articulo $articulo)
    {

        $articulo->delete();

        return redirect()->back()->with('success', 'Artículo eliminada correctamente.');
    }
}
