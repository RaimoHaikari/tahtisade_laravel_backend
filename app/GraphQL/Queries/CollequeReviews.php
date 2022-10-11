<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\DB;
use App\Models\CollequeReview AS CollequeReviewModel;

final class CollequeReviews
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $criticID = $args['criticID'];
        $collequeID= $args['collequeID'];

        $collequeReviews = array();

        $query = <<<END
        SELECT googleID, criticID, stars
        FROM reviews
        WHERE criticID = '$collequeID'
        AND googleID IN (
            SELECT googleID
            FROM reviews
            WHERE criticID = '$criticID'
        )
      END;

      $data = DB::select($query);

      foreach ($data as $d) {
          array_push(
              $collequeReviews, 
              new CollequeReviewModel(
                  [
                      'criticID' =>  $d->criticID,
                      'googleID' => $d->googleID,
                      'stars' => $d->stars
                  ]
              )
          );
      }

        // TODO implement the resolver
        return $collequeReviews;
    }
}
