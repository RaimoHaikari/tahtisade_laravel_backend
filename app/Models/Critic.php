<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Casts\ReviewerWithSharedItems;
use App\Models\DefaultCompset;


class Critic extends Model
{
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'distinct_critics';

    /**
     * The primary key associated with the table.
     * 
     * - Lisätty: 07.11.2022
     *
     * @var string
     */
    protected $primaryKey = 'criticID';

    /**
     * Indicates if the model's ID is auto-incrementing.
     * 
     * - Lisätty: 07.11.2022
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     * 
     * - Lisätty: 07.11.2022
     *
     * @var string
     */
    protected $keyType = 'string';



    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['defCompSet'];


    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'reviewerWithSharedItems' => ReviewerWithSharedItems::class,
    ];

    /**
     * Yhdistetään kriitikko hänen antamien arvostelujen kassa.
     * 
     * - Lisätty: 07.11.2022
     */
    public function reviews(): HasMany {
        return $this->hasMany(Review::class, 'criticID', 'criticID');
    }

    /**
     * Determine if the user is an administrator.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function getDefCompSetAttribute(): array
    {
        $defaultCompSet = array();
        $criticID = $this->attributes['criticID'];

        $query = <<<END
        SELECT R1.googleID, COUNT(*) AS count, AVG(R1.stars) AS starsAverage
        FROM reviews R1
        WHERE R1.criticID <> '$criticID'
        AND R1.googleID IN (
            SELECT googleID
            FROM reviews
            WHERE criticID = '$criticID'
        )
        GROUP BY R1.googleID     
      END;

        $data = DB::select($query);

        foreach ($data as $d) {
            array_push(
                $defaultCompSet, 
                new DefaultCompset(
                    [
                        'googleID' =>  $d->googleID,
                        'count' => $d->count,
                        'starsAverage' => $d->starsAverage
                    ]
                )
            );
        }

        return $defaultCompSet;
    }
}
