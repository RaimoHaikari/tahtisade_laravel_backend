import { createSlice } from '@reduxjs/toolkit';

/*
 * Yhteydet backEnd:iin
 */
import movieService from '../services/movies';


import ComponentService from '../components/SingleMovie/ReviewsTable';

import { 
    getPresentedItemsList,
    posterUrl,
    validURL 
} from '../misc/helperFunctions';

const initialState = {
    data: null,
    headers: [],
    search: '',
    sortingField: '',
    sortingOrder: '',
    visibleData: null,
    loading: false
}

const displayMovieData = (state, data) => {

    let newData = data;

    let reviews = getVisibleData(data.reviews); // mahollisilla linkeillä varustet
    let externalLinks = getMoreInfoLinks(newData);

    return {
        ...state,
        data: {
            ...newData,
            externalLinks: externalLinks,
            img: posterUrl(newData.img)
        },
        headers: getHeaders(),
        loading: false,
        visibleData: reviews
    };

}

const getHeaders = () => {
    return [
        { name: "Nimi", field: "name", sortable: true, searchable: false},
        { name: "Lähde", field: "link", sortable: false, searchable: false},
        { name: "Tähtiä", field: "starsAverage", sortable: true, searchable: false}
    ];
}

const getMoreInfoLinks = (data) => {

    const externalLinks = [];

    if(data.imdb && data.imdb.length > 0) {
        externalLinks.push({
            name: 'imdb',
            link: `https://www.imdb.com/title/${data.imdb}/`,
            bgColor: 'black',
            color: 'white'
        })
    }

    if(data.kavi && data.kavi.length > 0){
        externalLinks.push({
            name: 'elonet',
            link: `https://elonet.finna.fi/Record/${data.kavi}`,
            bgColor: '#b90000',
            color: 'white'
        })       
    }

    if(data.wiki && data.wiki.length > 0){
        externalLinks.push({
            name: 'wikidata',
            link: `https://www.wikidata.org/wiki/${data.wiki}`,
            bgColor: '#b90000',
            color: 'white'
        })       
    }

    return externalLinks;
}

/*
 * Muokataan yksittäisen arvostelun tiedoista taulukossa esitettävä versio,
 * jossa mm. tarvittaessa esitetään linkki alkuperäiseen arviointiin.
 */
const getVisibleData = (data) => {

    let newData = data.map(d => {

        let newLink = validURL(d.link)
            ? ComponentService.getSourceLink(d.publisher, d.link)
            : d.link;

        return {
            ...d,
            link: newLink,
            starsAverage: d.stars
        }
    });


    return newData;
}

const updateSortingSettings = (state, field)  => {

    let newField = field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    let sortedReviewsList = getPresentedItemsList(
        state.visibleData,
        state.search,
        newField,
        newOrder
    );

    return {
        ...state,
        sortingField: newField,
        sortingOrder: newOrder,
        visibleData: sortedReviewsList
    }
}


const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState,
    reducers: {
        fetchingMovie(state, action) {
            const {loading, data} = action.payload;

            if(loading) {
                return {
                    ...state,
                    loading: true
                }
            };

            return displayMovieData(state, data);
        },
        setSortingSettings(state, action){

            const { field } = action.payload;

            return updateSortingSettings(state, field);

        }
    }
})

export const {
    fetchingMovie,
    setSortingSettings
} = singleMovieSlice.actions;

export const initializeMovie = (val) => {

    return async dispatch => {

        dispatch(fetchingMovie({
            loading: true,   
        }));

        const movieId = val.movieId;

        //const movie = await movieService.getGeneralListing();
        const movie = await movieService.getMovieDetails(movieId);
        
        dispatch(fetchingMovie({
            loading: false,
            data: movie.data.movie
        }));

    }


}

export default singleMovieSlice.reducer;