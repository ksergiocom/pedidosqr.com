<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function show(Articulo $articulo)
    {
        return inertia("Gestion/Articulos/ShowPage", [
            "articulo" => $articulo,
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
        $validated = $request->validate([
            'nombre' => ['required', Rule::unique('articulos')->where(fn($q) => $q->where('user_id', auth()->id()))->ignore($articulo->id)],
            'descripcion' => ['nullable'],
            'precio' => ['required', 'numeric', 'decimal:0,2'],
            'image' => ['nullable', 'image', 'max:2048'],
        ], [
            'nombre.unique' => 'Ya tienes un artículo con ese nombre.',
        ]);

        $articulo->nombre = $validated['nombre'];
        $articulo->descripcion = $validated['descripcion'] ?? null;
        $articulo->precio = $validated['precio'];

        if ($request->hasFile('image')) {
            // (Opcional) Borra la anterior si quieres: Storage::disk('public')->delete(str_replace('/storage/','',$articulo->image_url));
            $path = $request->file('image')->store('articulos', 'public');
            Storage::disk('public')->delete(str_replace('/storage/', '', $articulo->image_url));
            $articulo->image_url = "/storage/{$path}";
        }

        $articulo->save();

        return redirect()->route('gestion.articulos.index')
            ->with('success', 'Artículo actualizado correctamente.');
    }


    public function store(Request $request)
    {
        /**
         * Comprobamos si el usuario no ha superado el limite de articulos permitidos a crear.
         */
        $user = auth()->user();
        $limiteArticulos = 150; // <- Define tu límite aquí

        // Comprobamos si el usuario ha superado el límite
        if ($user->articulos()->count() >= $limiteArticulos) {
             return back()->with('error','Has alcanzado el número máximo de artículos permitidos (' . $limiteArticulos . ').');
        }
        // -----------------------------------------------------

        $validated = $request->validate([
            'nombre' => ['required', Rule::unique('articulos')->where(fn($q) => $q->where('user_id', auth()->id()))],
            'descripcion' => ['nullable','string','max:1200'],
            'precio' => ['required', 'numeric', 'decimal:0,2'],
            'image' => ['nullable', 'image', 'max:2048'],  // <— validación
        ], [
            'nombre.unique' => 'Ya tienes un articulo con ese nombre.',
        ]);

        $data = [
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'precio' => $validated['precio'],
            'user_id' => auth()->id(),
        ];

        if ($request->hasFile('image')) {
            // Guarda en storage/app/public/articulos
            $path = $request->file('image')->store('articulos', 'public');
            // URL accesible via asset('storage/...')
            $data['image_url'] = "/storage/{$path}";
        }

        Articulo::create($data);

        return redirect()->route('gestion.articulos.index')
            ->with('success', 'Artículo creado correctamente.');
    }


    public function destroy(Articulo $articulo)
    {
        if ($articulo->pedidosDetalles()->exists()) {
            return back()->with('error','No se puede eliminar el artículo porque tiene pedidos asociados.');
        }

        // Si tiene imagen y existe la ruta
        if ($articulo->image_url) {
            // Quitamos el prefijo '/storage/' para obtener la ruta en disk('public')
            $relativePath = str_replace('/storage/', '', $articulo->image_url);

            // Borramos el fichero; el método delete tolera no existir el fichero
            Storage::disk('public')->delete($relativePath);
        }

        // Eliminamos el registro de BD
        $articulo->delete();

        return redirect()->back()->with('success', 'Artículo eliminado correctamente.');
    }

    /**
     * Elimina la imagen asociada al artículo.
     */
    public function destroyImage(Articulo $articulo)
    {
        // Comprueba primero si tiene URL de imagen
        if ($articulo->image_url) {
            // Le quitamos el prefijo '/storage/' para obtener la ruta en 'public' disk
            $relativePath = str_replace('/storage/', '', $articulo->image_url);

            // Elimina el fichero (silencioso si no existe)
            Storage::disk('public')->delete($relativePath);

            // Limpia el campo en la BBDD
            $articulo->image_url = null;
            $articulo->save();
        }

        // Si vienes de un formulario Inertia, puedes volver con:
        return back()->with('success', 'Imagen eliminada correctamente.');
    }
}
