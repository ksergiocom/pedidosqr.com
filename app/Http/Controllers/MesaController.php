<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Models\Mesa;

class MesaController extends Controller
{
    public function index(){
        $mesas = auth()->user()->mesas;

        return inertia("Gestion/Mesas/IndexPage", [
            "mesas" => $mesas,
        ]);
    }

    public function create(){
        $mesas = auth()->user()->mesas;

        return inertia("Gestion/Mesas/CreatePage", [
        ]);
    }

    public function get(Mesa $mesa){
        $articulos = $mesa->user->articulos;
        
        return view('mesa',[
            'mesa' => $mesa,
            'articulos' => $articulos,
        ]);
    }

    public function store(Request $request){
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

    public function eliminar(Mesa $mesa){
        
        $mesa->delete();

        return redirect()->back()->with('success', 'Mesa eliminada correctamente.');
    }

}
