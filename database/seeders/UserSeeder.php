<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Usuario para demos
        User::factory()->create([
            'email'=> 'demo@pedidosqr.com',
            'password'=> Hash::make('prueba'),
        ]);

        User::factory()->create([
            'email'=> 'sergio@ksergio.com',
            'password'=> Hash::make('hola_a_todos'),
        ]);

    }
}
