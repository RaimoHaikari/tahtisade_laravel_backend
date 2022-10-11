<?php

namespace App\GraphQL\Queries;
use Illuminate\Support\Facades\DB;
use App\Models\StarsOfTheGenre;

final class StarsBasedOnGenre
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $starsBasenOnGenre = array();

        $genre = $args['genre'];

        $query = <<<END
        SELECT DG.genre, DG.numberOfMovies AS total, PIVOT.nolla, PIVOT.yksi, PIVOT.kaksi, PIVOT.kolme, PIVOT.nelja, PIVOT.viisi
        FROM distinct_genres AS DG JOIN (
            SELECT G.genre,
                SUM(CASE ROUND(R.stars,0) WHEN 0 THEN 1 ELSE 0 END) AS 'nolla',
                SUM(CASE ROUND(R.stars,0) WHEN 1 THEN 1 ELSE 0 END) AS 'yksi',
                SUM(CASE ROUND(R.stars,0) WHEN 2 THEN 1 ELSE 0 END) AS 'kaksi',
                SUM(CASE ROUND(R.stars,0) WHEN 3 THEN 1 ELSE 0 END) AS 'kolme',
                SUM(CASE ROUND(R.stars,0) WHEN 4 THEN 1 ELSE 0 END) AS 'nelja',
                SUM(CASE ROUND(R.stars,0) WHEN 5 THEN 1 ELSE 0 END) AS 'viisi'
            FROM genres G LEFT JOIN reviews R ON G.googleID = R.googleID
            GROUP BY G.genre 
        ) AS PIVOT ON DG.genre = PIVOT.genre
        UNION
        SELECT 'Kaikki elokuvat',
            COUNT(DISTINCT(googleID)) as total,
            SUM(CASE ROUND(stars,0) WHEN 0 THEN 1 ELSE 0 END) AS 'nolla',
            SUM(CASE ROUND(stars,0) WHEN 1 THEN 1 ELSE 0 END) AS 'yksi',
            SUM(CASE ROUND(stars,0) WHEN 2 THEN 1 ELSE 0 END) AS 'kaksi',
            SUM(CASE ROUND(stars,0) WHEN 3 THEN 1 ELSE 0 END) AS 'kolme',
            SUM(CASE ROUND(stars,0) WHEN 4 THEN 1 ELSE 0 END) AS 'nelja',
            SUM(CASE ROUND(stars,0) WHEN 5 THEN 1 ELSE 0 END) AS 'viisi'
        FROM reviews
        UNION
        SELECT 'Muut genret',
            COUNT(DISTINCT(googleID)) as total,
            SUM(CASE ROUND(stars,0) WHEN 0 THEN 1 ELSE 0 END) AS 'nolla',
            SUM(CASE ROUND(stars,0) WHEN 1 THEN 1 ELSE 0 END) AS 'yksi',
            SUM(CASE ROUND(stars,0) WHEN 2 THEN 1 ELSE 0 END) AS 'kaksi',
            SUM(CASE ROUND(stars,0) WHEN 3 THEN 1 ELSE 0 END) AS 'kolme',
            SUM(CASE ROUND(stars,0) WHEN 4 THEN 1 ELSE 0 END) AS 'nelja',
            SUM(CASE ROUND(stars,0) WHEN 5 THEN 1 ELSE 0 END) AS 'viisi'
        FROM reviews 
        WHERE googleID NOT IN (
            SELECT googleID
            FROM genres 
            WHERE genre = '$genre'
        )
        UNION
        SELECT 'Ei vertailua', 0 AS total, 0 AS nolla, 0 AS yksi, 0 AS kaksi , 0 AS kolme, 0 AS nelja , 0 AS viisi
      END;

        $data = DB::select($query);

        foreach ($data as $d) {

            $stars = [
                $d->nolla,
                $d->yksi,
                $d->kaksi,
                $d->kolme,
                $d->nelja,
                $d->viisi
            ];

            /*
            throw new DevInfo(
                'This is the error message',
                "nelja tahtea:".$d->nelja
            );
            */


            array_push(
                $starsBasenOnGenre, 
                new StarsOfTheGenre(
                    [
                        'name' =>  $d->genre,
                        'stars' => $stars,
                        'total' => $d->total
                    ]
                )
            );
        }


        /*
        throw new DevInfo(
            'This is the error message',
            'The reason why this error was thrown, is rendered in the extension output.'
        );
        */

        /*
        return new StarsOfTheGenre(
            [
                'name' => "hell yeah"
            ]
        );
        */

        return $starsBasenOnGenre;
    }
}
