<?php

namespace App\GraphQL\Queries;
use App\Models\Movie;

final class Movies
{
    public function numbOfReviews($rootValue, array $args) {

        $reviews = Movie::where('googleID', $rootValue->googleID)
            ->get()
            ->first()
            ->reviews
            ->count();

        return $reviews;
    }
}
