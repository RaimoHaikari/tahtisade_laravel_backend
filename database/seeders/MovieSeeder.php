<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tyhjennetään taulu
        Movie::truncate();

        $csvFile = fopen("https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/DB/elokuvat.csv", "r");
        //$csvFile = fopen(base_path("database/data/movie.csv"), "r");

        $firstline = true;
        // id,nimi,wiki,imdb,kavi,img,ensiIlta
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {

                $ensiIlta =  explode(".", $data['7']);

                Movie::create([
                    "googleID" => $data['0'],
                    "nimi" => $data['1'],
                    "wiki" => $data['2'],
                    "imdb" => $data['3'],
                    "kavi" => $data['4'],
                    "img" => $data['5'],
                    "paiva" => intval($ensiIlta[0]),
                    "kuukausi" => intval($ensiIlta[1]),
                    "vuosi" => intval($ensiIlta[2])
                ]);    
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
