<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Writer extends Model
{
    protected $fillable = [
        'googleID', 'nimi', 'kaviID'
    ];

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'googleID', 'googleID');
    }
}
