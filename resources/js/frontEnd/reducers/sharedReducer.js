/* eslint-disable default-case */
import { createSlice } from '@reduxjs/toolkit';

import { 
    setCurretPage, 
    setDisplayType, 
    setSearchSettings,
    setSortingSettings
} from './movieListReducer';

import {
    setSortingSettings as setSingleMovieSortingSettings
} from './singleMovieReducer';

const initialState = {};

const sharedSlice = createSlice({
    name: 'sharedReducer',
    initialState,
    reducers: {
        foobar() {
            return initialState
        }
    }
});

export const updateCurretPage = (val) => {

    return dispatch => {
        
        switch(val.store){

            case 'movieList': 

                dispatch(setCurretPage({ page: val.page }));
                break;

                /*
            case 'genreList':

                dispatch(setGenrelistCurretPage({ page: val.page }));
                break;

            case 'reviewerList':
                dispatch(setReviewerlistCurretPage({ page: val.page }));
                break;

            case 'singleReviewer':
                dispatch(setSingleReviewerCurretPage({ page: val.page }));
                break;
                */
    

        }
    }
}

export const updateDisplayType = (val) => {

    return dispatch => {

        switch(val.store){
            
            case 'movieList': 

                dispatch(setDisplayType({type: val.type}));
                break;
        }
    }
}

/*
 * Esitettävään elokuvalistaan suoritettava hakurajaus
 */
export const updateSearchSetting = (val) => {

    return dispatch => {


        switch(val.store){
            
            case 'movieList': 

                dispatch(setSearchSettings({ str: val.str }));
                break;

            /*
            case 'genreList':

                dispatch(setGenrelistSearchSettings({ str: val.str }));
                break;

            case 'reviewerList':
                dispatch(setReviewerlistSearchSettings({ str: val.str }));
                break;

            case 'singleReviewer':
                dispatch(
                    setSingleReviewerSearchSettings({ 
                        str: val.str,
                        target: val.target === undefined?'primary':val.target
                    })
                );
                break;
            */

        }
    }
}

export const updateSortingSetting = (val) => {

    return dispatch => {

        switch(val.store){
            

            case 'movieList': 
                dispatch(setSortingSettings({field: val.field}));
                break;
            /*
            case 'genreList':
                dispatch(setGenrelistSortingSettings({field: val.field}));
                break;
            case 'reviewerList':
                dispatch(setReviewerlistSortingSettings({field: val.field}));
                break;
            case 'singleReviewer':
                dispatch(setSingleReviewerSortingSettings({field: val.field}));
                break;
            */
            case 'singleMovie':
                dispatch(setSingleMovieSortingSettings({field: val.field}))
                break;
        }
    }
}

export default sharedSlice.reducer;