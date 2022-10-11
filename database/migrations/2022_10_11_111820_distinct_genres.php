<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class DistinctGenres extends Migration
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
        DB::statement('DROP VIEW IF EXISTS distinct_genres');
    }

    private function createView(): string
    {
       return <<<SQL
            CREATE VIEW `distinct_genres` AS
            SELECT genre, COUNT(genre) as numberOfMovies
            FROM genres
            GROUP BY genre
       SQL;
    }

    private function dropView(): string
    {
       return <<<SQL
       DROP VIEW IF EXISTS `distinct_genres`;
       SQL;
    }
}
