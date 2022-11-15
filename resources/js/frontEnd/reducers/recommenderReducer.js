/*
 *  Redux Toolkitin avulla reducerin ja siihen liittyvät action creatorit voi luoda kätevästi createSlice-funktion avulla.
 */
import { createSlice, current, original } from '@reduxjs/toolkit';

import { criticsGQ } from '../misc/mockData';

import {intersection } from 'lodash'

const initialState = {
    loading: false,
    data: null,
    sharedReviews: []
}

/*
 * Gets recommendations for a person by useing a weighted average of every other
 * user´s rankins
 * 
 * @param prefs arvioitaville objekteille annetut arvosanat
 * @param person henkilö, jolle suositukset annetaan
 * @param similarity korrelaation arvioinnissa käytettävä funktio
 */
const getRecommendations = (prefs, person, similarity = simPearson) => {

    let personHasAlredySeen = Object.keys(prefs[person]);

    let totals = {};
    let simSums = {};

    Object.keys(prefs).forEach(other => {

        if(other === person) return;

        const sim = similarity(prefs, person, other);

        // Ignore scores of zero or lower
        if(sim <= 0) return;


        Object.keys(prefs[other]).forEach(item => {

            // Only score movies that person haven't seen yet
            if(personHasAlredySeen.indexOf(item) >= 0) return;

            // Similarity *  Score
            if(item in totals === false)
                totals[item] = 0;
            totals[item] = totals[item] + prefs[other][item] * sim;

            // Sum of similarities
            if(item in simSums === false)
                simSums[item] = 0;
            simSums[item] = simSums[item] + sim;

        });
        
    });

    let rankins = [];

    // Create the normalized list
    Object.keys(totals).forEach(item => rankins.push([item, totals[item] / simSums[item]]));

    // Return the sorted list
    rankins.sort(function(a, b) {
        return b[1] - a[1];
    });

    return Object.fromEntries(rankins);

}

/*
 * Etsitään objektit, jotka kumpikin arvostelija on arvioinut.
 * 
 * @param prefs arvioitaville objekteille annetut arvosanat
 * @param p1 vertailtava henkilö
 * @param p2 vertailtava henkilö
 */
const getTheListOfMutuallyRatedItems = (prefs, p1, p2) => {

    const p1_objects = Object.keys(prefs[p1]);
    const p2_objects = Object.keys(prefs[p2]);

    // Return the list of shared items
    return intersection(p1_objects, p2_objects);
}


/*
 * Lasketaan kriitikkojen antamien arvioiden välinen euklidinen etäisyys.
 * 
 * @param prefs arvioitaville objekteille annetut arvosanat
 * @param p1 vertailtava henkilö
 * @param p2 vertailtava henkilö
 */
const simDistance = (prefs, p1, p2) => {

    // Get the list of shared items
    let si = getTheListOfMutuallyRatedItems(prefs, p1, p2);

    // If they have no ratings in common, return 0
    if(si.length === 0)
        return 0;

    // Add up the squares of all the differences
    let sum_of_squares = si
        .map(item => Math.pow(prefs[p1][item] - prefs[p2][item],2))
        .reduce((partialSum, a) => partialSum + a, 0);

    return 1 / (1 + Math.sqrt(sum_of_squares))
}


/*
 * Lasketaan vertailtavien antamien arvioiden välinen Pearsonin korrelaatiokerroin
 *
 * @param prefs arvioitaville objekteille annetut arvosanat
 * @param p1 vertailtava henkilö
 * @param p2 vertailtava henkilö
 */
const simPearson = (prefs, p1, p2) => {

    // Get the list of shared items
    let si = getTheListOfMutuallyRatedItems(prefs, p1, p2);

    // Find the number of elements
    let n = si.length;

    // If they hava no ratings in common, return 0;
    if(n === 0) return 0;

    // Add up all the preferences
    let sum1 = si.map(item => prefs[p1][item]).reduce((partialSum, a) => partialSum + a, 0);
    let sum2 = si.map(item => prefs[p2][item]).reduce((partialSum, a) => partialSum + a, 0);

    // Sum up the squares
    let sum1sq = si.map(item => Math.pow(prefs[p1][item],2)).reduce((partialSum, a) => partialSum + a, 0);
    let sum2sq = si.map(item => Math.pow(prefs[p2][item],2)).reduce((partialSum, a) => partialSum + a, 0);

    // Sum up the products
    let pSum = si.map(item => prefs[p1][item] * prefs[p2][item]).reduce((partialSum, a) => partialSum + a, 0);

    // Calculate Pearson score
    let num = pSum-(sum1*sum2/n);
    let den = Math.sqrt((sum1sq - Math.pow(sum1,2) / n) * (sum2sq - Math.pow(sum2,2) / n));

    if(den === 0) return 0;

    return num / den;
}

/*
 * Returns the best matches for person from the prefs dictionary.
 * Number of results and similarity function are optional params.
 * 
 * @param prefs arvioitaville objekteille annetut arvosanat
 * @param person henkilö, johon muita on tarkoitus vertailla
 * @param n kuinka monta parasta palautetaan
 * @param similarity korrelaation arvioinnissa käytettävä funktio
 */
const topMatches = (prefs, person, n=5, similarity = simPearson) => {

    let scores = []

    Object.keys(prefs).forEach(other => {

        if(other !== person){
            const value = similarity(prefs, person, other)
            scores.push([other, value])
        }
        
    });

    scores.sort((a,b) => {
        return b[1] - a[1]
    });

    return Object.fromEntries(scores.slice(0,n));
}

/*
 * Muunnetaan palvelimelta luettu aineisto helpommin käsiteltävään muotoon.
 *
 * @param data Palvelimelta luettu graphQL aineisto
 */
const transformData = (data) => {

    const transformed = {};

    data.forEach(d => {

        const key = d.criticID;
        const values = {};

        d.reviews.forEach(review => values[review.googleID] = review.stars);

        transformed[key] = values;
    })

    return transformed;

}

const recommenderSlice = createSlice({
    name: 'recommender',
    initialState,
    reducers: {
        fooBar(state, action) {

            console.log("Jotain tarttis tehdä");

            //console.log(simDistance(state.data, 'Lisa Rose', 'Gene Seymour'));
            //console.log(simPearson(state.data, 'Lisa Rose', 'Gene Seymour'));
            //console.log(topMatches(state.data, 'Toby', 3));
            console.log(getRecommendations(state.data, 'Toby'));
            console.log(getTheListOfMutuallyRatedItems(state.data, 'Lisa Rose', 'Gene Seymour'));

            return {
                ...state
            }
        },
        setPair(state, action){

            const {p1, p2} = action.payload;
            const bothHave = getTheListOfMutuallyRatedItems(state.data, p1, p2);

            const reviews = bothHave.map(item => {
                return [
                    state.data[p1][item],
                    state.data[p2][item]
                ]
            })

            return {
                ...state,
                sharedReviews:  reviews
            }

        },
        fetchingData(state, action){
            const {data, loading} = action.payload;

            if(loading){
                return {
                    ...state,
                    loading: true
                }
            }

            return {
                ...state,
                loading: false,
                data: data,
            }
        }
    }
});

export const {
    fooBar, fetchingData, setPair
} = recommenderSlice.actions;

export const initialize = () => {

    return async dispatch => {

        dispatch(fetchingData({
            loading: true,
            data: null,
        }));

        setTimeout(() => {

            const data = criticsGQ;
            
            dispatch(fetchingData({
                loading: false,
                data: transformData(data),
            }))

        }, 500);
    }
}

export default recommenderSlice.reducer;