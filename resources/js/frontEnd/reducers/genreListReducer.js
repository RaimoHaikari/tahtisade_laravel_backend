import { createSlice } from '@reduxjs/toolkit';

/*
 * Yhteydet backEnd:iin.
 */
import movieService from '../services/movies';

import { getNumberOfPagesTotal, getVisibleItems, getPaginationLinks, round } from "../misc/helperFunctions";


const DISPLAYTYPE = [

    {
        name: 'Taulukko',
        active: true,
        content: 'GENRELIST_TABLE'
    }
];

/*
 *
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "genre", sortable: true, searchable: true},
        { name: "Keskiarvo", field: "starsAverage",  sortable: true, searchable: false},
        { name: "Elokuvien määrä", field: "numberOfMovies",  sortable: true, searchable: false},
        { name: "Arvostelujen määrä", field: "numberOfReviews", sortable: true, searchable: false},
    ];
}

/*
    currentPage: 1,
    data: null,
    displayTypes: DISPLAYTYPE,
    headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    itemsPerPage: 25,
    loading: false,
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],   
    search: '',
    sunburst: {
        data: null,
        selected: null,
        hovered: null,
        loading: false,
        width: 500,
        height: 500
    },
    sortingField: '',
    sortingOrder: '',
    visibleData: null,
*/
const initialState = {
    currentPage: 1,
    data: null,
    displayTypes: DISPLAYTYPE,
    headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    itemsPerPage: 25,
    loading: false,
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],   
    search: '',
    sortingField: '',
    sortingOrder: '',
    totalItems: null,
    totalPages: null,
    visibleData: null,
}

const displayGenreList = (state, genres) => {

    let loadedGenreList = genres;

    // let productPage = `/elokuvat/${d.googleID}`;
    loadedGenreList = loadedGenreList.map(g => {

        let productPage = `/genret/${g.genre}`;

        return {
            ...g,
            starsAverage: round(g.starsAverage, 2),
            productPage: productPage
        };
    });

    let genresToShow = getPresentedGenreList(
        loadedGenreList,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    );

    
    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   genresToShow = getVisibleItems(genresToShow, state.currentPage, state.itemsPerPage)

   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);
    
    return {
        ...state,
        data: loadedGenreList,
        headers: getHeaders(),
        loading: false,
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: genresToShow
    };
}


/*
 * Lähtökohtaisesti esitetään genrelista kokonaisuudessaan, jossa yhteydessä:
 * - mainitaan montako kyseisen genremäärityksen omaavaa elokuvaa kokonaan/osaksi 
 *   on kantaan tallennettu
 * - ko. genremäärityksen omaavien elokuvien keskimääräinen arvosana
 * 
 * Listaa voidaan suodattaa hakusanan avulla.
 * 
 * Huom! Tässä vaiheessa ei vielä suoriteta sivutusta
 */
const getPresentedGenreList = (allTheGenres,  search ,sortingField, sortingOrder) => {

    let computedGenres = allTheGenres;

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(search) {

        computedGenres = computedGenres.filter(item => {

            return (
                item.genre.toLowerCase().includes(search.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */
    if(sortingField){

        const reversed = sortingOrder === "asc" ? 1 : -1;

        let shallowCopy = computedGenres.slice();

        shallowCopy.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "genre":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })

        computedGenres = shallowCopy

    }

    return computedGenres;

}

/*
 * Lajittelujärjestyksen muutos
 */
const updateSortingSettings = (state, field)  => {

    let newField = field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    let genresToShow = getPresentedGenreList(
        state.data,
        state.search, 
        newField, 
        newOrder
    );


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        paginationLinks: paginationLinks,
        sortingField: newField,
        sortingOrder: newOrder,
        currentPage: newCurrentPage,
        visibleData: genresToShow  
    }
}

/*
 * Asetetaan aktiivisen sivun sisältö.
 */
const updateCurretPage = (state, page) => {

    let newCurrentPage = page;

    // - päivitetään kävijälle näytettävä listaus
    let genresToShow = getPresentedGenreList(
        state.data,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    );


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);
    
    return {
        ...state,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: genresToShow,
        paginationLinks: paginationLinks,
        currentPage: newCurrentPage
    };
}

/*
 * Hakutermin muutos
 */
const updateSearchSetting = (state, str) => {

    let searchStr = str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let genresToShow = getPresentedGenreList(
        state.data,
        searchStr, 
        state.sortingField, 
        state.sortingOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        search: searchStr,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: genresToShow,
    }
}


const genrelistSlice = createSlice({
    name: 'genreList',
    initialState,
    reducers: {
        fetchingGenres(state, action){
            const { genres, loading } = action.payload;

            if(loading){
                return {
                    ...state,
                    loading: true
                }
            }

            return displayGenreList(state, genres);
        },
        setSearchSettings(state, action) {
            const { str } = action.payload;
            return updateSearchSetting(state, str);
        },
        setSortingSettings(state, action) {

            const { field } = action.payload;
            return updateSortingSettings(state, field);

        },
        setCurretPage(state, action) {
            const { page } = action.payload;
            return updateCurretPage(state, page);
        }
    }
})

export const {
    fetchingGenres,
    setCurretPage,
    setSearchSettings,
    setSortingSettings
} = genrelistSlice.actions;

export const initializeGenres = () => {

    return async dispatch => {

        dispatch(fetchingGenres({
            loading: true,
            genres: null
        }))

        const genres =  await movieService.getGenresOverview();

        dispatch(
            fetchingGenres({loading: false,genres: genres.data.distinctGenres})
        )
        
        /*
        setTimeout(() => {
            
            dispatch(
                fetchingGenres({loading: false,genres: genres.data.allGenres})
            )
        }, 1000);
        */
    }
};


export default genrelistSlice.reducer;