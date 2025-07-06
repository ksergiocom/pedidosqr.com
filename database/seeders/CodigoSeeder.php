<?php

namespace Database\Seeders;

use App\Models\Codigo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CodigoSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $user = User::where('email', 'demo@pedidosqr.com')->first();


        for ($i = 0; $i < 7; $i++) {
            Codigo::create([
                'nombre' => "Codigo " . strtoupper($faker->bothify('??-##')),
                'user_id' => $user->id,
            ]);
        }
    }
}