<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Articulo;


class ArticuloController extends Controller
{
        public function index(){
        $articulos = auth()->user()->articulos;

        return view("gestion.articulos", [
            "articulos" => $articulos,
        ]);
    }

    public function crear(Request $request){
        $validated = Validator::make($request->all(), [
            'nombre' => [
                'required',
                Rule::unique('articulos')->where(function ($query) {
                    return $query->where('user_id', auth()->id());
                }),
            ],
            'descripcion' => ['nullable'],
            'precio' => ['numeric','decimal:0,2']
        ], [
            'nombre.unique' => 'Ya tienes un articulo con ese nombre.',
        ])->validate();

        Articulo::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'],
            'precio' => $validated['precio'],
            'user_id' => auth()->id(),
        ]);

          return redirect()->back()->with('success', 'Artículo creada correctamente.');
    }

    public function eliminar(Articulo $articulo){
        
        $articulo->delete();

        return redirect()->back()->with('success', 'Artículo eliminada correctamente.');
    }
}
