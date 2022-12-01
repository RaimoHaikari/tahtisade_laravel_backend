import { createSlice } from "@reduxjs/toolkit";

import MutationServices from "../services/mutations";

const initialState = {
    loading: false,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        checkLoginState(state){

            const userToken = window.localStorage.getItem('tahtisade-user-token');

            if (userToken) {

                return {
                    ...state,
                    token: userToken
                }

            }
            
            return {
                ...state
            }

        },
        logUserIn(state, action){

            const { loading, token } = action.payload;

            if(loading) {
                return {
                    ...state,
                    loading: true
                }
            }

            localStorage.setItem('tahtisade-user-token', token);

            return {
                ...state,
                loading: false,
                token: token
            }
        },
        logoutUser(state){

            localStorage.removeItem('tahtisade-user-token');

            return {
                ...state,
                loading: false,
                token: null
            }

        }
    }
});

export const { checkLoginState, logoutUser, logUserIn } = userSlice.actions;

export const login = ({username, password}) => {

    return async dispatch => {

        try {

            dispatch(logUserIn({
                loading: true,
                token: null
            }));
    
            const {data} = await MutationServices.login({
                username: username,
                password: password
            });

            dispatch(logUserIn({
                loading: false,
                token: data.login ? data.login.value : null
            }));

        } catch (e) {

            console.log(e);

        }


    }
}



export default userSlice.reducer;