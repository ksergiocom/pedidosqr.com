<?php

namespace Database\Seeders;

use App\Models\Articulo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;

class ArticuloSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        $user = User::where('email', 'demo@pedidosqr.com')->first();

        $productos = [
            [ 'nombre' => 'Paella Valenciana', 'precio' => 16.50, 'imagen' => 'paella.jpg' ],
            [ 'nombre' => 'Ensalada Mediterránea', 'precio' => 9.20, 'imagen' => 'ensalada.jpg' ],
            [ 'nombre' => 'Tortilla Española', 'precio' => 7.80, 'imagen' => 'tortilla.jpg' ],
            [ 'nombre' => 'Croquetas Caseras de Jamón', 'precio' => 6.50, 'imagen' => 'croquetas.jpg' ],
            [ 'nombre' => 'Calamares a la Romana', 'precio' => 11.00, 'imagen' => 'calamares.jpg' ],
            [ 'nombre' => 'Hamburguesa Gourmet', 'precio' => 13.90, 'imagen' => 'hamburguesa.jpg' ],
            [ 'nombre' => 'Pizza Cuatro Quesos', 'precio' => 12.80, 'imagen' => 'pizza.jpg' ],
            [ 'nombre' => 'Pollo al Curry con Arroz Basmati', 'precio' => 14.30, 'imagen' => 'pollo_curry.jpg' ],
            [ 'nombre' => 'Tarta de Queso al Horno', 'precio' => 5.90, 'imagen' => 'tarta_queso.jpg' ],
            [ 'nombre' => 'Brownie con Helado de Vainilla', 'precio' => 6.20, 'imagen' => 'brownie.jpg' ],
            [ 'nombre' => 'Flan Casero de Huevo', 'precio' => 4.50, 'imagen' => 'flan.jpg' ],
            [ 'nombre' => 'Cerveza Artesanal', 'precio' => 3.80, 'imagen' => 'cerveza.jpg' ],
            [ 'nombre' => 'Refresco Natural de Limón', 'precio' => 2.50, 'imagen' => 'refresco_limon.jpg' ],
            [ 'nombre' => 'Copa de Vino Tinto Crianza', 'precio' => 4.20, 'imagen' => 'vino_tinto.jpg' ],
            [ 'nombre' => 'Café Espresso Doble', 'precio' => 1.80, 'imagen' => 'cafe.jpg' ],
        ];

        foreach ($productos as $producto) {

            // Generar una descripción aleatoria de longitud 100–400 caracteres
            $descripcion = '';
            while (strlen($descripcion) < 100) {
                $descripcion .= ' ' . $faker->paragraph();
            }
            $descripcion = mb_substr($descripcion, 0, 400);

            // Ruta origen (en database/seeders/imagenes_articulos)
            $origen = database_path('seeders/imagenes_articulos/' . $producto['imagen']);
            $destino = 'articulos/' . $producto['imagen'];

            // Crear carpeta si no existe
            if (!Storage::disk('public')->exists('articulos')) {
                Storage::disk('public')->makeDirectory('articulos');
            }

            if (!file_exists($origen)) {
                $this->command->warn("⚠️ Imagen de origen no encontrada: {$origen}. Se usará imagen por defecto.");
                $imageUrl = '/storage/articulos/default.jpg';
            } else {
                if (!Storage::disk('public')->exists($destino)) {
                    copy($origen, storage_path('app/public/' . $destino));
                }
                $imageUrl = '/storage/' . $destino;
            }

            Articulo::create([
                'nombre' => $producto['nombre'],
                'descripcion' => $descripcion,
                'precio' => $producto['precio'],
                'user_id' => $user->id,
                'image_url' => $imageUrl,
            ]);
        }
    }
}
