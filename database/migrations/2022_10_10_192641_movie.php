<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Movie extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->integer('googleID');
            $table->string('nimi');
            $table->string('wiki')->nullable();
            $table->string('imdb')->nullable();
            $table->string('kavi')->nullable();
            $table->string('img');
            $table->integer('paiva');
            $table->integer('kuukausi');
            $table->integer('vuosi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
