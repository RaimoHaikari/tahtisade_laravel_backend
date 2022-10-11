<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateGenreReviewsView extends Migration
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
        DB::statement('DROP VIEW IF EXISTS genre_reviews');
    }


    private function createView(): string
    {
       return <<<SQL
       CREATE VIEW `genre_reviews` AS
       SELECT ge.genre, mo.googleID, re.criticID, re.stars 
       FROM genres ge JOIN movies mo ON ge.googleID = mo.googleID 
        JOIN reviews re ON mo.googleID = re.googleID 
        ORDER BY ge.genre, mo.googleID
       SQL;
    }

    private function dropView(): string
    {
       return <<<SQL
       DROP VIEW IF EXISTS `genre_reviews`;
       SQL;
    }
}
