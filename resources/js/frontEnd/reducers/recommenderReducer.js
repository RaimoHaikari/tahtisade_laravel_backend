/*
 *  Redux Toolkitin avulla reducerin ja siihen liittyvät action creatorit voi luoda kätevästi createSlice-funktion avulla.
 */
import { createSlice, current, original } from '@reduxjs/toolkit';

import { critics, criticsGQ } from '../misc/mockData';

import {intersection } from 'lodash'

const initialState = {
    loading: false,
    data: null,
    sharedReviews: []
}

/*
 * Building the Item Comparison Dataset
 *
 * - this does not have to be done every time a recommendation is needed - instead,
 *   you build the dataset once and reuse it each time you need it
 */
const calculateSimilarItems = (prefs, n=10, similarity = simPearson) => {

    // Create a dictionary of items showing which other items they are most similar to
    let result = {};

    // Invert the preference matrix to be item-centric
    let itemPrefs = transformPrefs(prefs);
    
    let c = 0;
    let movies = Object.keys(itemPrefs);

    movies.forEach(item => {

        // Status updates for large datasets
        c = c + 1;
        if(c%100 === 0)
            console.log(`${c} / ${movies.length}`);

        // Find the most similar items to this one
        let scores = topMatches(itemPrefs, item, n, similarity );
       
        result[item] =  scores;
    });

    return result

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
 * Get recommendations using the item similarity dictionary.
 */
const getRecommendedItems = (prefs, itemMatch, user) => {

    let userRatings = prefs[user];
    let scores = {};
    let totalSim = {};

    // Loop over items rated by this user
    Object.keys(userRatings).forEach(item => {
        const rating = userRatings[item];

        // Loop over items similar to this one
        Object.keys(itemMatch[item]).forEach(item2 => {

            const similarity = itemMatch[item][item2];


            // Ignore if this user has already rated this item
            if(item2 in userRatings) return;

            // Weighted sum of rating times similarity
            if(item2 in scores === false)
                scores[item2] = 0;

            scores[item2] = scores[item2] + similarity * rating;

            // Sum of all the similarities
            if(item2 in totalSim === false)
                totalSim[item2] = 0;

            totalSim[item2] = totalSim[item2] + similarity;

        })

    });

    const rankins = [];

    // Divide each total score by total weighting to get an average
    Object.keys(scores).forEach(item => {
        rankins.push([
            item, 
            totalSim[item] !== 0 ? scores[item]/totalSim[item]:0
        ])
    });

    // Return the sorted list
    rankins.sort(function(a, b) {
        return b[1] - a[1];
    });

    return rankins;

}

/*

    // Create the normalized list
    Object.keys(totals).forEach(item => rankins.push([item, totals[item] / simSums[item]]));

    // Return the sorted list
    rankins.sort(function(a, b) {
        return b[1] - a[1];
    });

    return Object.fromEntries(rankins);
*/

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

    //return 1 / (1 + Math.sqrt(sum_of_squares));
    return 1 / (1 + sum_of_squares);
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

/*
 * Kirjassa käytetty funktio, joka muuntaa tietorakenteen, jossa käydään läpi
 * henkilöitäin heidän elokuville antamia arvosteluja, listaksi jossa
 * käydään elokuvittain läpi henkilöiden näille elokuville antamia arvosteluja.
 * 
 * Ennen:
 * {'Lisa Rose': {'Lady in the Water': 25, 'Snakes on a Plane': 3.5}, 'Gene Seymour':{....}}
 * 
 * Jälkeen:
 * {'Lady in the Water': {'Lisa Rose': 2.5, 'Gene Seymour': 3.0}, ...}
 */
const transformPrefs = (prefs) => {

    let result = {};

    Object.keys(prefs).forEach(person => {

        Object.keys(prefs[person]).forEach(item => {

            if(item in result === false)
                result[item] = {}

            // Flip item and person
            result[item][person] = prefs[person][item];

        })

    });

    return result;
}

const recommenderSlice = createSlice({
    name: 'recommender',
    initialState,
    reducers: {
        fooBar(state, action) {

            console.log("Jotain tarttis tehdä");

            console.log(simDistance(state.data, 'Lisa Rose', 'Gene Seymour'));
            //console.log(simPearson(state.data, 'Lisa Rose', 'Gene Seymour'));
            //console.log(topMatches(state.data, 'Toby', 3));
            //console.log(getRecommendations(state.data, 'Toby'));
            //const movies = transformPrefs(state.data);
            //console.log(movies);

            // console.log(topMatches(movies, 'Superman Returns'));
            //console.log(getTheListOfMutuallyRatedItems(state.data, 'Lisa Rose', 'Gene Seymour'));
            //let itemsim = calculateSimilarItems(state.data, 10, simPearson);
            //console.log(itemsim)
            //console.log(getRecommendedItems(state.data, itemsim, 'Toby'));

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
            //const data = critics;
            
            dispatch(fetchingData({
                loading: false,
                data: transformData(data),
                // data: data
            }))

        }, 500);
    }
}

export default recommenderSlice.reducer;