<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            MovieSeeder::class,
            ReviewSeeder::class,
            GenreSeeder::class,
            ActorSeeder::class,
            DirectorSeeder::class,
            DistributorSeeder::class,
            WriterSeeder::class
        ]);
    }
}
