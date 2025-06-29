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
        $users = User::all();

        foreach ($users as $user) {
            for ($i = 0; $i < 3; $i++) {
                Mesa::create([
                    'nombre' => "Mesa " . strtoupper($faker->bothify('??-##')),
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}