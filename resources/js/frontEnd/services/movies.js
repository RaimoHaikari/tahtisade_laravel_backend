import axios from "axios";

import {
    ALL_MOVIES_LARAVEL,
    MOVIE_DETAILS_LARAVEL
} from "../queries";

const backendUrl = '/graphql';

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

export default {
    getGeneralListing,
    getMovieDetails
}
