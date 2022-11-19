import axios from "axios";

import {
    ALL_CRITICS_LARAVEL,
    ALL_GENRES_LARAVEL,
    ALL_MOVIES_LARAVEL,
    COLLEQUE_REVIEWS_LARAVEL,
    MOVIE_DETAILS_LARAVEL,
    SINGLE_CRITIC_LARAVEL,
    STARS_BASED_ON_GENRE_LARAVEL
} from "../queries";

//const backendUrl = '/graphql';
const backendUrl = 'http://tietokana.tahtisadetta.fi/graphql';

/* Vertailuun valitun kriitikon arvio aktiivisen kriitikon arvostelemista elokuvista */
const getCollequeReviews = async (criticID, collequeID) => {

    const response = await axios.post(
        backendUrl,
        {
            query: COLLEQUE_REVIEWS_LARAVEL,
            variables: {
                criticId: criticID,
                collequeId: collequeID
            }
        }
    )

    return response.data

}

/* Yksittäisen kriitikon tietojen perussetti */
const getCriticDetails = async (id) => {

    const response = await axios.post(
        backendUrl,
        {
            query: SINGLE_CRITIC_LARAVEL,
            variables: {
                criticId: id
            }
        }
    )

    return response.data

};

/*
 * Haetaan kriitikot listaavalla yhteenvetosivulla esitettävät tiedot
 */
const getCriticsOverview = async () => {

    const response = await axios.post(
        backendUrl,
        {
            query: ALL_CRITICS_LARAVEL
        }
    )

    return response.data
}

/*
 * Haetaan elokuvat listaavalla sivulla esitettävät yhteenvetotiedot
 */
const getGeneralListing = async () => {

    const response = await axios.post(
        backendUrl,
        {
            query: ALL_MOVIES_LARAVEL
        }
    )

    return response.data
}

/*
 * Haetaan genreluokkien yhteenvetosivulla esitettävät tiedot
 */
const getGenresOverview = async () => {

   const response = await axios.post(
       backendUrl,
       {
           query: ALL_GENRES_LARAVEL
       }
   )

   return response.data
}

const getMovieDetails = async (id) => {

    const response = await axios.post(
        backendUrl,
        {
            query: MOVIE_DETAILS_LARAVEL,
            variables: {
                googleId: id
            }
        }
    )

    return response.data

};

const getStarsBasedOnGenres = async (genre) => {

    const response = await axios.post(
        backendUrl,
        {
            query: STARS_BASED_ON_GENRE_LARAVEL,
            variables: {
                genre: genre
            }
        }
    )

    return response.data

};

export default {
    getCollequeReviews,
    getCriticsOverview,
    getCriticDetails,
    getGeneralListing,
    getGenresOverview,
    getMovieDetails,
    getStarsBasedOnGenres
}
