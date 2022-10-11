<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'criticID',
        'googleID',
        'name',
        'stars',
        'link',
        'publisher',
    ];

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'googleID', 'googleID');
    }
}
