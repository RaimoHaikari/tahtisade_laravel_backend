<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DefaultCompset extends Model
{

    /**
     * 
     * The attributes that are mass assignable.
     *
     * @var array<int, int, float>
     */
    protected $fillable = [
        'googleID',
        'count',
        'starsAverage',
    ];

}
