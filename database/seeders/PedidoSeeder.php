<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Mesa;
use App\Models\Articulo;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $mesas = Mesa::all();

        foreach ($mesas as $mesa) {
            // Cada mesa tendrá de 1 a 5 pedidos
            for ($i = 0; $i < rand(1, 5); $i++) {
                $pedido = Pedido::create([
                    'mesa_id' => $mesa->id,
                ]);

                // Obtener artículos del mismo usuario
                $articulos = Articulo::where('user_id', $mesa->user_id)->inRandomOrder()->take(rand(2, 6))->get();

                foreach ($articulos as $articulo) {
                    PedidoDetalle::create([
                        'pedido_id' => $pedido->id,
                        'articulo_id' => $articulo->id,
                        'cantidad' => rand(1, 5),
                    ]);
                }
            }
        }
    }
}