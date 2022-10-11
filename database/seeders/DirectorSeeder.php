<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Director;

class DirectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tyhjennetään taulu
        Director::truncate();

        $csvFile = fopen("https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/DB/ohjaajat.csv", "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                Director::create([
                    "googleID" => $data['0'],
                    "nimi" => $data['1'],
                    "kaviID" => $data['2']
                ]);    
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
