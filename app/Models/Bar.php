<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bar extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'distinct_critics';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'criticID';

    public function reviews(): HasMany {
        return $this->hasMany(Review::class, 'criticID', 'criticID');
    }
}
