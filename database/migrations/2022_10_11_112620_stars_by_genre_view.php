<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class StarsByGenreView extends Migration
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
        DB::statement('DROP VIEW IF EXISTS stars_by_genre');
    }


    private function createView(): string
    {
       return <<<SQL
       CREATE VIEW `stars_by_genre` AS 
       SELECT T1.genre, T1.numberOfMovies, T2.starsAverage, T2.numberOfReviews 
       FROM ( 
        SELECT genre, COUNT(*) AS numberOfMovies 
        FROM genres GROUP BY genre 
       ) AS T1 LEFT JOIN ( 
        SELECT G.genre, AVG(R.stars) AS starsAverage, COUNT(*) as numberOfReviews 
        FROM genres G LEFT JOIN reviews R ON G.googleID = R.googleID 
        GROUP BY G.genre
       ) AS T2 ON T1.genre = T2.genre
       SQL;
    }

    private function dropView(): string
    {
       return <<<SQL
       DROP VIEW IF EXISTS `stars_by_genre`;
       SQL;
    }
}
