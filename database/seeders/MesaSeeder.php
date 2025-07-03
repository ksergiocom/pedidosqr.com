<?php

namespace Database\Seeders;

use App\Models\Mesa;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MesaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $user = User::where('email', 'demo@pedidosqr.com')->first();


        for ($i = 0; $i < 7; $i++) {
            Mesa::create([
                'nombre' => "Mesa " . strtoupper($faker->bothify('??-##')),
                'user_id' => $user->id,
            ]);
        }
    }
}