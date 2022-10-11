<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ReviewsByTheMovie extends Migration
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
        DB::statement('DROP VIEW IF EXISTS reviews_by_movie');
    }

    private function createView(): string
    {
       return <<<SQL
       CREATE VIEW `reviews_by_movie` AS 
       SELECT googleID, COUNT(*) AS count, AVG(stars) AS starsAverage 
       FROM reviews 
       GROUP BY googleID
       SQL;
    }

    private function dropView(): string
    {
       return <<<SQL
       DROP VIEW IF EXISTS `reviews_by_movie`;
       SQL;
    }
}
