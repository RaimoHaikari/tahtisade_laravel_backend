<?php

namespace App\Casts;

use Illuminate\Support\Facades\DB;
use App\Models\ReviewerWithSharedItems as ReviewerWithSharedItemsModel;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;

class ReviewerWithSharedItems implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function get($model, string $key, $value, array $attributes)
    {
        $arrReviewerWithShardItems= array();

        $criticID = $attributes['criticID'];

        $query = <<<END
        SELECT R1.criticID, R1.name, COUNT(*) as count
        FROM reviews R1
        WHERE R1.criticID <> '$criticID'
        AND R1.googleID IN (
            SELECT googleID
            FROM reviews
            WHERE criticID = '$criticID'
        )
        GROUP BY R1.criticID, R1.name        
      END;

        $users = DB::select($query);

        foreach ($users as $user) {
            array_push(
                $arrReviewerWithShardItems, 
                new ReviewerWithSharedItemsModel(
                    [
                        'criticID' =>  $user->criticID,
                        'count' => $user->count,
                        'name' => $user->name
                    ]
                )
            );
        }

        return $arrReviewerWithShardItems;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return mixed
     */
    public function set($model, string $key, $value, array $attributes)
    {
        if (! $value instanceof ReviewerWithSharedItemsModel) {
            throw new InvalidArgumentException('The given value is not an ReviewerWithShardItemsModel instance.');
        }

        return [
            'criticID' => $value->criticID,
            'count' => $value->count,
            'name' => $value->name,
        ];
    }
}
