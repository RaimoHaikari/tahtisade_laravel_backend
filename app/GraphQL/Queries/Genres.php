<?php

namespace App\GraphQL\Queries;

use App\Models\GenreReview;
use App\Exceptions\CustomException;

final class Genres
{

    
    public function numberOfReviews($rootValue, array $args) {

        $nOfreviews = GenreReview::where('genre', $rootValue->genre)
            ->get()
            ->count();

        /*
        throw new CustomException(
            'This is the error message',
            $rootValue->genre
        );
        */
        

        return $nOfreviews;
    }

    /*
    */

    public function starsAverage($rootValue, array $args) {


        $avg = GenreReview::where('genre', $rootValue->genre)
            ->get()
            ->avg('stars');

        /* Jos genren elokuvilla ei ole vielä talletettuja arvostelua... */
        if(is_null($avg))
            return 0;

        return $avg;
        
    }
    
}
