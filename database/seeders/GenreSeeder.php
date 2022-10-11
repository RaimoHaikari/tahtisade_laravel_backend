<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Genre::truncate();

        $csvFile = fopen("https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/DB/genret.csv", "r");

        $firstline = true;
        // id,nimi,wiki,imdb,kavi,img,ensiIlta
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {

            if (!$firstline) {

                Genre::create([
                    "googleID" => $data['0'],
                    "genre" => $data['1'],
                ]);    
            }

            $firstline = false;
        }

        fclose($csvFile);
    }
}
