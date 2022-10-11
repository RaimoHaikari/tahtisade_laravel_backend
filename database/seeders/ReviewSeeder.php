<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tyhjennetään taulu
        Review::truncate();

                
        $csvFile = fopen("https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/DB/arvostelut.csv", "r");

        $firstline = true;
        // id,nimi,wiki,imdb,kavi,img,ensiIlta
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {

                //dd( floatval($data['2']));

                Review::create([
                    "criticID" => $data['0'],
                    "googleID" => $data['1'],
                    "stars" => floatval($data['2']),
                    "link" => $data['3'],
                    "publisher" => $data['4'],
                    "name" => $data['5']
                ]);

            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
