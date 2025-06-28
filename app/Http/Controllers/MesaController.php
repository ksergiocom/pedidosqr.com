<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
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
        // $articulos = $mesa->user->articulos;

        return inertia('Gestion/Mesas/QrPage', [
            'mesa' => $mesa,
            // 'articulos' => $articulos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'nombre' => [
                'required',
                Rule::unique('mesas')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                }),
            ],
        ], [
            'nombre.unique' => 'Ya tienes una mesa con ese nombre.',
        ])->validate();

        Mesa::create([
            'nombre' => $validated['nombre'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('gestion.mesas.index')->with('success', 'Mesa creada correctamente.');
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

    public function update(Request $request, Mesa $mesa)
    {

        $validated = Validator::make($request->all(), [
            'nombre' => [
                'required',
                Rule::unique('mesas')->where(function ($query) use ($mesa) {
                    return $query->where('user_id', auth()->id());
                })->ignore($mesa->id),
            ],
        ], [
            'nombre.unique' => 'Ya tienes una mesa con ese nombre.',
        ])->validate();

        $mesa->update([
            'nombre' => $validated['nombre'],
        ]);

        return redirect()->route('gestion.mesas.index')->with('success', 'Mesa actualizada correctamente.');
    }

}
