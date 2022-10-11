<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class DistinctCriticsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement($this->dropView());
        DB::statement($this->createView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS distinct_critics');
    }


    private function createView(): string
    {
       return <<<SQL
       CREATE VIEW `distinct_critics` AS 
       SELECT criticID, name AS nimi, COUNT(*) AS numbOfReviews, AVG(stars) AS starsAverage 
       FROM reviews 
       GROUP BY criticID, name
       SQL;
    }

    private function dropView(): string
    {
       return <<<SQL
       DROP VIEW IF EXISTS `distinct_critics`;
       SQL;
    }
}
