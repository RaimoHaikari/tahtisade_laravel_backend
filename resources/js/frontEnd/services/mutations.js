import axios from "axios";
import { print } from "graphql"

import { LOGIN } from "../graphql/mutations"

let backendUrl = 'https://infinite-depths-50039.herokuapp.com/';

/*
 *
 *
const addMovieCountry = async ({ googleID, country, token}) => {

    const config = {
        headers: { Authorization: `bearer ${token}` },
    }

    const response = await axios.post(
        backendUrl,
        {
            query: print(ADD_MOVIE_COUNTRY),
            variables: {
                googleId: parseInt(googleID),
                country: country
            }
            
        },
        config
    );

    return response.data;
}
*/


/*
 *
 */
const login = async ({username, password}) => {

    const response = await axios.post(
        backendUrl,
        {
            query: print(LOGIN),
            variables: {
                username: username,
                password: password
            }
        }
    )

    return response.data;
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login
};