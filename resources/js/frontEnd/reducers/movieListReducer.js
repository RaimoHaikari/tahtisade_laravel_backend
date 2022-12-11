/*
 *  Redux Toolkitin avulla reducerin ja siihen liittyvät action creatorit voi luoda kätevästi createSlice-funktion avulla.
 */
import { createSlice } from '@reduxjs/toolkit';

/*
 * Yhteydet backEnd:iin.
 */
import movieService from "../services/movies";

import {
    average,
    posterUrl,
    round
} from "../misc/helperFunctions";

import {
    SiFirst,
    SiLastpass
} from "react-icons/si";

/*

    {
        name: 'Tilastografiikkana',
        active: true,
        content: 'MOVIELIST_GRAPHICAL_OVERVIEW'
    }

 */
const DISPLAYTYPE = [
    {
        name: 'Taulukko',
        active: true,
        content: 'MOVIELIST_TABLE'
    },
    {
        name: 'Kuvakkeet',
        active: false,
        content: 'MOVIELIST_CARD'
    },

];

/*
    + allTheMovies: null,
    + currentPage: 1,
    + displayTypes: DISPLAYTYPE,
    + headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    + genreNames: null,
    genreNamesLoading: false,
    + itemsPerPage: 25,
    + moviesLoading: false,
    + message: 'Aloitustervehdys',
    + maxNumberOfPaginationLinks: 5,
    + paginationLinks: [],
    + search: '',
    + sortingField: '',
    + sortingOrder: '',
    + totalItems: 0,  // näytettävien objektien kokonaismäärä
    + totalPages: 0,  // kuinka monta sivua tarvitaan, kun kerralla näytetään itemsPerPage objektia sivulla
    + visibleData: null
*/
const initialState = {
    allTheMovies: null,         // Kaikki elokuvat sisältävä lista, josta näytettävät elokuvat suodatetaan
    currentPage: 1,             // Monesko "sivu" elokuvalistauksesta esitetään
    displayTypes: DISPLAYTYPE,  // Aineiston esittämisen vaihtoehtoiset tavat
    genreNames: null,
    headers: [],               // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    itemsPerPage: 30,           // Kuinka monen elokuvan tiedot sivulla näytetään kerrallaan
    maxNumberOfPaginationLinks: 5,
    message: 'Aloitustervehdys',
    moviesLoading: true,    // Ollaanko hakemassa aineistoa palvelimelta
    paginationLinks: [],
    search: '',             // Haetaanko elokuvaa hakutermin avulla
    sortingField: '',       
    sortingOrder: '',
    totalItems: 0,          // näytettävien objektien kokonaismäärä
    totalPages: 0,          // kuinka monta sivua tarvitaan, kun kerralla näytetään itemsPerPage objektia sivulla
    visibleData: null       // Suodatusten & sivutuksen jälkeen jäävä, käyttäjälle esitettävä aineisto
}
/*
 * Suodatetaan kaikki elokuvat sisältävästä listasta kävijälle näytettävät elokuvat.
 * 
 * - onko syötetty elokuvan nimeen kohdistuva hakutermi
 * - montako elokuvaa sivulla näyttään kerrallaan
 * - kuinka elokuvat halutaan lajitella
 * - halutaanko nähdä vain tietyn genremäärityksen täyttävät elokuvat
 *
 * @todo: Virhetilanteen käsittely puuttuupi
 */
const displayMovieList = (state, movies, genreList) => {

    /* Genrelistan esikäsittely */
    let newGenreNames = genreList.map(d => {

        return {
            name: d.genre,
            display: true
        }

    })

    /* - Elokuvien esikäsittely */
    let loadedMovieList = movies.map(d => {

        let productPage = `/elokuvat/${d.googleID}`;
        let genres = d.genres.map(g => g.genre);

        /*

            numberOfReviews: d.stars.length,
        */
        return {
            ...d,
            img: posterUrl(d.img),
            productPage: productPage,
            genre: genres,
            numberOfReviews: d.reviews.length,
            averageOfReviews: (
                d.reviews.length===0
                ?0
                :round(
                    average(
                        d.reviews.map(r => r.stars)
                    )
                    ,2
                )
            )
        }

    })

    let moviesToShow = getPresentedMovieList(
        loadedMovieList,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, state.currentPage, state.itemsPerPage);


    let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        allTheMovies: loadedMovieList,
        genreNames: newGenreNames,
        headers: getHeaders(),
        message: "Sovellus alustettu",
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: moviesToShow,
        moviesLoading: false
    }

}

/*
 * @todo: Joskus palauttaa allTehMoviesin nullina?
 */
const getActiveMovies = (allTheMovies, genreNames) => {

    const activeGenres = genreNames
        .filter(g => g.display === true)
        .map(g => g.name);

    const activeMovies = allTheMovies
        .filter((movie) => {
            const gList = movie.genre;

            const found = gList.some(g => activeGenres.indexOf(g) >= 0)

            return found
        })
    
    return activeMovies

}

/*
 * Huom!
 * 
 * Jotta yhteistä, lajiteltavaa taulukkoa voi käyttää, pitää reducerin tarjota tämän
 * tyyppinen headers -taulukko.
 * 
 * @todo: Pitäisikö lukea palvelimelta
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "nimi", sortable: true, searchable: true },
        { name: "Arvosteluja yht.", field: "numberOfReviews",  sortable: true, searchable: false},
        { name: "Keskiarvo", field: "averageOfReviews",  sortable: true, searchable: false}
    ];
}

/*
 * H A K U E H D O T  T Ä Y T T Ä V Ä T   E L O K U V A T

 * Palvelimelta on haettu yhteenvetotiedot kaikista kantaan tallennetuista elokuvista.
 * Poimintaan näistä käyttäjälle esitettävät elokuvat. Valintaan vaikuttaa mm.:
 * - onko jotain suodatettu
 * - kuinka elokuvat halutaan lajitella
 * 
 * Huom! Tässä vaiheessa ei vielä suoriteta sivutusta
 */
const getPresentedMovieList = (allTheMovies, currentPage, itemsPerPage, search ,sortingField, sortingOrder, genreNames) => {

    let computedMovies = allTheMovies === null ? [] : allTheMovies;

    /*
     * Rajaus genremäärityksen perusteella
     */
    if(genreNames){
        computedMovies = getActiveMovies(computedMovies, genreNames) 
    }

    /*
     * Haku
     * - kohdistuu elokuvan nimeen
     */
    if(search){

        computedMovies = computedMovies.filter(item => {

            return (
                item.nimi.toLowerCase().includes(search.toLowerCase())
            )
        })
    }

    /*
     * Lajittelu
     */

    
    if(sortingField) {

        const reversed = sortingOrder === "asc" ? 1 : -1;

        let shallowCopy = computedMovies.slice();

        shallowCopy.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "nimi":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })

        computedMovies = shallowCopy
    
    }
    
    return computedMovies;
}

/*
 * Sivutukseen tarvittava tieto 
 * 
 * ts. montako sivua tarvitaan, että kaikki elokuvat saadaa esitettyä, kun yhdelle sivulle
 * mahtuu korkeintaan [itemsPerPage] elokuvaa
 * 
 */
const getNumberOfPagesTotal = (state, itemsTotal) => {

    //let pagesTotal = state.totalPages;
    let pagesTotal = 0;
    let itemsPerPage = state.itemsPerPage;

    if(itemsTotal > 0 && itemsPerPage > 0)
        pagesTotal = (Math.ceil(itemsTotal / itemsPerPage))

    return pagesTotal

}

/*
 * Sivulla näytettävät elokuvat, kun sivutus otetaan huomioon.
 */
const getVisibleMovies = (moviesUpToLevel, currentPage, itemsPerPage) => {

    return moviesUpToLevel.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
    );

}


/*
 * Lasketaan sivutuslinkeissä esitettävien sivut.
 *
 * - linkkien muodostamisen ensimmäinen vaihe
 */
const getPaginationIndexes = (currentPage, maxNumberOfPaginationLinks, totalPages) => {

    let alaRaja = 1;
    let vasen = true;           // Onko "vasemmalla tilaa"
    let ylaRaja = totalPages;
    let oikea = true;           // Onko "oikealla tilaa"

    let i = 0;
    let j = 1;                  // Kytkin jonka avulla laskurin arvoa käännetään positivisen ja negatiivisen välillä
    let index = currentPage;

    let indexes = [];

    let valmis = false

    do {
        index = index + (i * j);

        // lisätään sivu, mikäli indeksi taulukon sisällä
        if((index >= alaRaja) && (index <= ylaRaja))
            indexes.push(index)

        /*
         * Onko taulukossa vielä pienempiä / suurempia indeksejä
         */
        if(index === alaRaja)
            vasen = false;

        if(index === ylaRaja)
            oikea = false;

        /*
         * Jatketaanko silmukkaa
         * - riittävä määrä sivuja kasassa
         */
        if(indexes.length === maxNumberOfPaginationLinks)
            valmis = true;
        

        /*
         * Sivulle mahtuu enemmän objekteja, kuin mitä kantaan on talletettu.
         * Ei siis tarvetta sivutukselle.
         * - numberOfItems > totalPages
         */
        if(vasen===false & oikea===false)
            valmis = true;

        // päivitetään laskurit
        j *= -1;
        i++;

    }
    while(valmis !== true)
    //while(i < maxNumberOfPaginationLinks && valmis !== true)

    return indexes.sort((a,b) => a - b);
}

/*
 * Sivutuslinkkien alustus
 *
 * - selvitetään mitkä sivut pitää näyttää tulostettavassa Pagination listauksessa
 * - muotoillaan linkit.
 */
const getPaginationLinks = (currentPage, maxNumberOfPaginationLinks, totalPages) => {

    let indices = getPaginationIndexes(currentPage, maxNumberOfPaginationLinks, totalPages);

    indices = indices.map((index,i) => {

        let linkLabel = index;
        let linkIindex = index;
        let linkClass = "numb";

        /*
         * Korjataan tarvittaessa ensimmäinen linkki osoittamaan ensimmäiselle sivulle
         */
        if((i) === 0){
            if(index > 1) {
                linkIindex = 1
                linkLabel = <SiFirst />
                linkClass = "btn prev"
            }
        }

        /*
         * Korjataan tarvittaessa viimeinen linkki osoittamaan viimeiselle sivulle
         */
        if((i+1) === maxNumberOfPaginationLinks){
            if(index < totalPages) {
                linkIindex = totalPages
                linkLabel = <SiLastpass />
                linkClass = "btn next"
            }
        }

        /* Aktiivisen sivun korostus */
        if(index === currentPage)
            linkClass="numb active"


        return {
            className: linkClass,
            index: linkIindex,
            label: linkLabel
        }
    })

    return indices;
}

/*
 * Kytketään tai sammutetaan kaikki genrelistauksen objetit
 */
const toggleGenreList = (state, allVisible) => {

    let newGenreNames = state.genreNames.map(g => {
        return {
            ...g,
            display: allVisible
        }
    });


    // elokuvalista vastaamaan genre-suodatusta
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );

    let newCurrentPage = 1;
    let moviesToShowTotally = moviesToShow.length;

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage);

    /*
     * Sivutukseen tarvittava tieto
     */
    let pagesTotal = getNumberOfPagesTotal(state, moviesToShowTotally);

    // state.totalPages?
    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);
    //let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        genreNames: newGenreNames,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow,
        totalPages: pagesTotal
    }

}

const toggleSingleGenre = (state, genreName) => {

    // - genrelistauksen päivitys
    let newGenreNames = state.genreNames.map(g => {

        let newDisplay = g.display

        if(g.name === genreName){
            newDisplay = !newDisplay
        }

        return {
            ...g,
            display: newDisplay
        };
    });



    // elokuvalista vastaamaan genre-suodatusta
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );


    let newCurrentPage = 1;
    let moviesToShowTotally = moviesToShow.length;

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage);

    /*
     * Sivutukseen tarvittava tieto
     */
    let pagesTotal = getNumberOfPagesTotal(state, moviesToShowTotally);


    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        genreNames: newGenreNames,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow,
        totalPages: pagesTotal
    }
}

/*
 * Asetetaan aktiivisen sivun sisältö.
 */
const updateCurretPage = (state, page) => {

    let newCurrentPage = page;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies, 
        newCurrentPage, 
        state.itemsPerPage,
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        state.genreNames
    );
    
    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: moviesToShow,
        paginationLinks: paginationLinks,
        currentPage: newCurrentPage
    };
}

/*
 * Hakuehdon aiheuttamaan muutokseen reagointi.
 */
const updateSearchSetting = (state, str) => {

    let searchStr = str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage,
        searchStr, 
        state.sortingField, 
        state.sortingOrder,
        state.genreNames
    );

    /*
     * Resetoidaan currentPage
     */
    let newCurrentPage = 1;

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);


    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        currentPage: newCurrentPage,
        search: searchStr,
        totalItems: itemsTotal,
        visibleData: moviesToShow,
        totalPages: pagesTotal,
        paginationLinks: paginationLinks
    }

}

/*
 * Lajittelujärjestyksen muutos
 */
const updateSortingSetting = (state, field) => {

    let newField = field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";



    let moviesToShow = getPresentedMovieList(
        state.allTheMovies, 
        state.currentPage, 
        state.itemsPerPage,
        state.search, 
        newField, 
        newOrder,
        state.genreNames
    );


    // - päivitetään kävijälle näytettävä elokuvalistaus
    let newCurrentPage = 1

    //Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, state.totalPages);

    return {
        ...state,
        sortingField: newField,
        sortingOrder: newOrder,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow 
    }


}



const movielistSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        fetchingMovies(state, action){
            const { genres, loading, movies } = action.payload;

            if(loading) { 
                return {
                    ...state,
                    moviesLoading: true
                }
            }

            return displayMovieList(state, movies, genres);
        },
        setCurretPage(state, action){
            const { page } = action.payload;
            return updateCurretPage(state, page);
        },
        /*
         * Asetetaan listaustyyppi
         *
         * Elokuvalistaus voidaan esittää joko taulukkomuodossa tai kuvakkeina.
         */
        setDisplayType(state, action) {

            const { type } = action.payload;


            let updatedTypes = state.displayTypes.map(dType => {
                
                let newState = dType.name === type?true:false;

                return {
                    ...dType,
                    active: newState
                }
            });


            return {
                ...state,
                displayTypes: updatedTypes
            }
        },
        setGenreFilter(state, action){

            const { allVisible, name, type } = action.payload;

            if(type === 'single') {
                return toggleSingleGenre(state, name);
            }

            return toggleGenreList(state, allVisible);
        },
        setSearchSettings(state, action) {
            const { str } = action.payload;
            return updateSearchSetting(state, str);
        },
        setSortingSettings(state, action) {

            const { field } = action.payload;
            const updatedState = updateSortingSetting(state, field);
            return updatedState
        }
    }
})

export const { 
    fetchingMovies, 
    setCurretPage, 
    setDisplayType, 
    setGenreFilter,
    setSearchSettings,
    setSortingSettings 
} = movielistSlice.actions;


export const initializeMovies = () => {

    return async dispatch => {

        dispatch(fetchingMovies({
            loading: true,
            movies: null,
            genres: null
        }));

        const movies =  await movieService.getGeneralListing();

        dispatch(
            fetchingMovies({
                loading: false,
                movies: movies.data.movies,
                genres: movies.data.distinctGenres
            })
        );
    
    }

}

export const updateGenresVisibility = (val) => {

    return dispatch => {
        dispatch(
            setGenreFilter({
                allVisible: val.active,
                name: null,
                type: 'all'
            })
        )
    };

}

/*
 *
 */
export const updateSingleGenreVisibility = (val) => {

    // console.log("- updateSingleGenreVisibility")

    return dispatch => {
        dispatch(
            setGenreFilter({
                allVisible: null,
                name: val.name,
                type: 'single'
            })
        )
    };

}

export default movielistSlice.reducer;