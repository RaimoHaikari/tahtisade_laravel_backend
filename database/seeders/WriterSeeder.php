<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Writer;

class WriterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tyhjennetään taulu
        Writer::truncate();
        $csvFile = fopen("https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/DB/kasikirjoitus.csv", "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                Writer::create([
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
