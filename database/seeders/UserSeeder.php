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

        // Usuario fijo para pruebas
        User::factory()->create([
            'email' => 'sergio@ksergio.com',
            'password' => Hash::make('asdasd'),
        ]);

        // Usuarios aleatorios
        for ($i = 0; $i < 10; $i++) {
            User::factory()->create([
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'),
            ]);
        }
    }
}
