<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Codigo;
use App\Models\Articulo;
use App\Models\User;
use Illuminate\Database\Seeder;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {

        // Obtener el usuario demo
        $user = User::where('email', 'demo@pedidosqr.com')->first();

        if (!$user) {
            $this->command->warn('Usuario demo@pedidosqr.com no encontrado. No se crearán pedidos.');
            return;
        }

        // Obtener solo las codigos asociadas a ese usuario
        $codigos = Codigo::where('user_id', $user->id)->get();

        foreach ($codigos as $codigo) {
            // Cada codigo tendrá de 1 a 5 pedidos
            for ($i = 0; $i < rand(1, 5); $i++) {
                $pedido = Pedido::create([
                    'codigo_id' => $codigo->id,
                ]);

                // Obtener artículos del mismo usuario
                $articulos = Articulo::where('user_id', $user->id)->inRandomOrder()->take(rand(2, 6))->get();

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
