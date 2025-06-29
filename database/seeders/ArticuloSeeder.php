<?php

namespace Database\Seeders;

use App\Models\Articulo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ArticuloSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES'); // idioma general en español
        $faker->addProvider(new \FakerRestaurant\Provider\en_US\Restaurant($faker)); // proveedor de alimentos

        $users = User::all();

        // Métodos disponibles del provider FakerRestaurant
        $generadores = [
            'foodName',
            'beverageName',
            'dairyName',
            'sauceName',
            'fruitName',
            'vegetableName',
            'meatName',
        ];

        foreach ($users as $user) {
            $usados = [];

            for ($i = 0; $i < 15; $i++) {
                // Elegir un método aleatorio
                $metodo = $faker->randomElement($generadores);

                // Generar el nombre del producto
                $nombre = $faker->$metodo();

                // Evitar duplicados por user_id + nombre si tienes restricción única
                if (in_array($nombre, $usados)) {
                    $i--;
                    continue;
                }
                $usados[] = $nombre;

                Articulo::create([
                    'nombre' => $nombre,
                    'descripcion' => $faker->sentence(nbWords:$faker->numberBetween(10,80)),
                    'precio' => $faker->randomFloat(2, 1, 30),
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
