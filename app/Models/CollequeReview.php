<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CollequeReview extends Model
{
    protected $fillable = [
        'criticID',
        'googleID',
        'stars',
    ];
}
