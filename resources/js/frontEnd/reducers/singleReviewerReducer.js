import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'd3';

import {
    getNumberOfPagesTotal,
    getPaginationLinks,
    getVisibleItems,
    round
} from "../misc/helperFunctions";

/*
 * Yhteydet backEnd:iin
 */
import movieService from '../services/movies';


const DEFAULT_COMPSET_ID = 'muutKriitikot';
const COMPSET_COL_NAME = 'compStars';

/*
 * Kollegoiden vertailulistan lajittelujärjestys
 */
const C_LIST_SORTING = {
    COUNT : {
        isActive: false,
        name: 'Arvostelujen määrä',
        value: 'byCount',
        sortingField: 'count',
        sortingOrder: 'desc'
    }, 
    NAME: {
        isActive: true,
        name: 'Arvostelijan nimi',
        value:'byName',
        sortingField: 'name',
        sortingOrder: 'asc'
    }, 
};

const DEFAULT_SELECTED_MOVIES = {
    ids: [],
    lbl: ''
}

const initialState = {
    activeCompId: null,             // Vertailtavana olevan kriitikon id-tunnus
    currentPage: 1,
    colleaguesList: null,
    colleaguesListSortingOptions: C_LIST_SORTING,
    colleaguesListSearchStr: '',    // Muiden kriitikkojen nimilistaan kohdistuva haku
    compset: null,                  // Muiden kriitikkojen yhteisille eloville antamat arvostelut kokoava taulukko
    data: null,
    headers: [],
    itemsPerPage: 25,
    loading: false,
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],
    originalColleaquesList: null,
    reviewerData: null,             // Aktiivisen kriitikon tiedot
    scatterPlotData: [],            // Vertailun hajontakuviossa esitettävä kaikka yhteiset arvosanat (sivutuste ei siis huomioita)
    searchStr: '',                  // Elokuvaluetteloon kohdistuva haku
    selectedMovies: DEFAULT_SELECTED_MOVIES,
    shares: null,
    sortingField: '',
    sortingOrder: '',
    visibleData: null,
    barBar: null,
}

/*
 * Lähtötietojen asetus.
 * Talletetaan palvelimelta luetut, aktiivisen kriitikon tiedot.
 */
const displayReviewerData = (state, data ) => {

    const criticID = data.critic.criticID;
    const criticName = data.critic.nimi;
    const defCompSet = data.critic.defCompSet.map(c => {
        return {
            googleID: c.googleID,
            count: c.count,
            starsAverage: c.starsAverage
        }
    })


    /* let newData = data.reviews; */
    let newData = data.allReviews.map(r => {
        return {
            criticID: criticID,
            elokuvanNimi: r.movie.nimi,
            googleID: r.googleID,
            link: r.link,
            name: criticName,
            publisher: r.publisher,
            starsAverage: r.stars
        }
    });


    /* let newReviewerData = data.reviewerData[0]; */
    let newReviewerData = {
        id: criticID,
        name: criticName
    }

    
    /* 
     * Talletetaan vertailtavan kriitikon oletusarvo, jolloin vertailusarakkeesa näytetään mitä kaikki muut
     * arvostelijat ovat keskimäärin antaneet samoille elokuville.
     * 
     * Alustetaan taulukko: joka kertoo: 
     * - kuinka monta yhteistä elokuvaa muut kriitikot ovat arvostelleet (nimilista)
     * - vertailutiedot kokoava taulukko (arvostelukokoelma)
     * 
     */
    let newActiveCompId = DEFAULT_COMPSET_ID;

    let newCompset = setupCompset(defCompSet);

    let originalColleaquesList = data.critic.reviewerWithSharedItems.map(c => {
        return {
            id: c.criticID,
            count: c.count,
            name: c.name
        }
    });

    let newColleaguesList = setupColleaguesList(
        newCompset, 
        originalColleaquesList, 
        Object.values(state.colleaguesListSortingOptions).filter(o => o.isActive)[0],
        state.colleaguesListSearchStr
    );

    let visibleData = getPresentedReviewsList(
        newData, 
        state.searchStr, 
        state.sortingField,
        state.sortingOrder,
        getActiveCompData(newActiveCompId, newCompset),
        state.selectedMovies
    );

    let scatterPlotData = visibleData.map(d => [d.starsAverage, d.compStars]);

    /* Jaotetellaan elokuvat sen perustella, kumpi antoi enemmän tähtiä (aktiivinen kriitikko vai vertailussa oleva) */
    let newShares = getShares(visibleData);
    newShares = wrapShares(newShares, false);

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = visibleData.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);


   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   visibleData = getVisibleItems(visibleData, state.currentPage, state.itemsPerPage);
   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

   /* Päivitetään arvosanataulukon otsikot */
   let newHeaders = updateHeaders(newColleaguesList, getHeaders());

   return {
        ...state,
        activeCompId: newActiveCompId,
        colleaguesList: newColleaguesList,
        compset: newCompset,
        data: newData,
        headers: newHeaders,
        loading: false,
        paginationLinks: paginationLinks,
        originalColleaquesList: originalColleaquesList,
        reviewerData: newReviewerData,
        scatterPlotData: scatterPlotData,
        shares: newShares,
        visibleData: visibleData
    };
}

/*
 * Haetaan muiden kriitikkojen arvosteluita sisältävästä taulukosta vertailussa olevan
 * kriitikon antamat arvosanat
 * 
 * - mikäli id-tunnusta vastaavia tietoja ei löydy, palautetaan null
 */
const getActiveCompData = (id, compset) => {

    let revs = compset.filter(c => c.id === id);

    return revs.length===1?revs[0]:null;

}

/*
 *
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "elokuvanNimi", sortable: true, searchable: false},
        { name: "Tähtiä", field: "starsAverage", sortable: true, searchable: false},
        { name: "Lähde", field: "link", sortable: false, searchable: false},
        { name: "Vertailu", field: "compStars", sortable: true, searchable: false},
    ];
}


/*
 * Suodatetaan ja lajitellaan kaikista kriitikon antamista arvosteluista esiin sivulla näytettävä listaus
 * - kenen kanssa vertaillaan
 */
const getPresentedReviewsList = (allTheReviews, searchStr, sortingField, sortingOrder, compset, selected) => {

    let computedReviews = allTheReviews;

    /*
     * Valitaan mukaan vain ne elokuvat, jotka myöskin vertailuun valittu kriitikko on arvostellut
     */
    if(compset !== null) {

        // - napataan vertailukriitikon arvostelemien elokuvien id-tunnukset
        let ids = compset.reviews.map(r => r.googleID);

        // - karstitaan pois elokuvat, joite vertailussa oleva kriitikko ei ole arvostellut
        computedReviews = computedReviews
            .filter(item => ids.indexOf(item.googleID) !== -1)

        // - liitetään mukaan vertailussa olevan kriitikon antama arvosana
        computedReviews = computedReviews.map(r => {

            let googleID = r.googleID;

            let found = compset.reviews.filter(c => c.googleID === googleID)

            return {
                ...r,
                compStars: round(found[0].starsAverage,0)
            }
        })

    }

    /* 
     * Mikäli grafiikan kautta on tehty arvosanojen suhteeseen perustuva rajaus, 
     * valitaan mukaan vain ehdon mukaiset elokuvat
     */

    if(selected.ids.length > 0) {

        // - karstitaan pois elokuvat, joite vertailussa oleva kriitikko ei ole arvostellut
        computedReviews = computedReviews
            .filter(item => {
                return selected.ids.indexOf(item.googleID) !== -1
            })
    }

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(searchStr) {

        computedReviews = computedReviews.filter(item => {

            return (
                item['elokuvanNimi'].toLowerCase().includes(searchStr.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */ 
    if(sortingField){

        const reversed = sortingOrder === "asc" ? 1 : -1;

        computedReviews = computedReviews.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "elokuvanNimi":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })
    }

    return computedReviews
}


/*
 * Käydään läpi elokuvat, jotka sekä aktiivinen kriitikko että vertailuun valittu kriitikko 
 * ovat molemmat arvostelleen.
 * Jatetaan elokuvat kolmeen ryhmään sen mukaan, kumpi antoi paemman arvosanan.
 * 
 * @param zoomed onko grafiikasta aktivoitu joku kolmesta ryhmästä (parempi, sama, huonompi)
 */
const getShares = (visibleData, zoomed =  false) => {

    let osuudet = [
        {val: "Parempi", lkm: 0, ids:[]},	// Arvostelia antoi paremman arvosanan kuin...
        {val: "Sama", lkm: 0, ids:[]},
        {val: "Huonompi", lkm: 0, ids:[]}       
    ]

    visibleData.forEach(element => {

        let filmId = element.googleID;
                
        let compGrade = element.compStars;
        let actGrade = element.starsAverage;
        
        //compGrade = Math.floor(compGrade) + Math.ceil(compGrade % 1)/2;
        //actGrade = Math.floor(actGrade) +  Math.ceil(actGrade % 1)/2;
        
        if(actGrade > compGrade){
            osuudet[0].ids.push(filmId);
            osuudet[0].lkm += 1; 
        }
        else if(actGrade < compGrade){
            osuudet[2].ids.push(filmId);
            osuudet[2].lkm += 1;
        }
        else {
            osuudet[1].ids.push(filmId);
            osuudet[1].lkm += 1;
        }
    });

    return osuudet
}


/*
 * Tilanteessa, jossa jokin arvosanaryhmä (parempi, huonompi, sama) on aktivoitu grafiikasta
 * täytyy passiivisena olevien ryhmien elokuvalistat säilyttää osuudet kokoavassa taulukossa
 */
const restorePassiveShares = (newShares, oldShares, active) => {

    let updated = newShares.filter(item => item.val === active)[0]
    
    return oldShares.map(item => {
        if(item.val === active)
            return updated;

        return item
    })
}

/*
 * Hakutermin muutos, kun haku kohdistuu kriitikon arvostelemien elokuvien listaan
 */
const setReviewsSearchSettings = (state, str) => {

    let searchStr = str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let visibleData = getPresentedReviewsList(
        state.data,
        searchStr, 
        state.sortingField, 
        state.sortingOrder,
        getActiveCompData(state.activeCompId, state.compset),
        state.selectedMovies
    );

    /* Jaotetellaan elokuvat sen perustella, kumpi antoi enemmän tähtiä (aktiivinen kriitikko vai vertailussa oleva) */
    /*
     * Mikäli grafiikasta on valittu tietty arvosanaryhmä (paremmat, huonommat, samat) päälle,
     * passiivisten ryhmien määrät pitää pysyä tallessa!
     */
    let newShares = getShares(visibleData);

    if(state.selectedMovies.lbl !== '')
        newShares = restorePassiveShares(newShares, state.shares.shares, state.selectedMovies.lbl);

    // lisätään tieto, että kyseessä on hakutermin muutos
    newShares = wrapShares(newShares, true);


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = visibleData.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    visibleData = getVisibleItems(visibleData, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        searchStr: searchStr,
        shares: newShares,
        visibleData: visibleData
    }

}

/*
 * Alustetaan samoja elokuvia arvostelleiden kriitikoinen lista.
 *
 * @compSet: objekti johon valittujen kriitikoiden antamat arvosanat kerätään. 
 *           Lähtötilanteessa sisältää tiedon siitä mitä muut yhteensä ovat antaneet
 * 
 * @list:   Luettelo samoja elokuvia arvostelleista kriitikoista, joka sisältää myös
 *          tiedon kuinka monta yhteistä elovaa kukin on arvostellut
 */
const setupColleaguesList = (compSet, list, settings, searchStr) => {

    let cList = [];

    const reversed = settings.sortingOrder === "asc" ? 1 : -1;

    let defCompSet = compSet.filter(c => c.id === DEFAULT_COMPSET_ID)[0].reviews

    /* Oletuksena vertailuun valittu se, mitä muut ovat keskimäärin antaneet elokuvalle arvosanoja */
    cList.push({
        id: DEFAULT_COMPSET_ID,
        name: 'Muut yhteensä',
        count: defCompSet.length,
        active: true,
        availeable: true,
        visible: true
    })

    /* Lajitellaan loput */
    let newColleaguesList = sortColleaguesList(
        list,
        settings
    )

    /* Huomioidaan hakutermi mikäli sellainen on asetettu */
    if(searchStr) {

        newColleaguesList = newColleaguesList.filter(item => {

            return (
                item.name.toLowerCase().includes(searchStr.toLowerCase()) 
            )

        })
    }
    
    cList = cList.concat(
        newColleaguesList.map(r => {


            return {
                ...r,
                active: false,
                availeable: false,
                visible: true
            }
        })
    )

    return cList
}


/*
 * Kerätään taulukkoon mitä muut kriitikot ovat antaneet aktiivisen kriitikon arvostelemille elokuville
 */
const setupCompset = (data) => {

    let compset = [];

    compset.push(
        {
            id: DEFAULT_COMPSET_ID,
            reviews: data
        }     
    );

    return compset

}


/*
 * reviewerWithShardItems
 */
const sortColleaguesList = (l, settings) => {

    let list = [...l]

    const reversed = settings.sortingOrder === "asc" ? 1 : -1;

    list.sort((a,b) => {
    
        let val;

        switch (settings.value) {
            case "byName":

                let aName =  a[settings.sortingField].split(" ");
                let bName = b[settings.sortingField].split(" ");

                val = reversed * aName[aName.length-1].localeCompare(bName[bName.length-1])

                break;
            default:
                val =  reversed * (
                    (a[settings.sortingField] > b[settings.sortingField]) 
                    ? 1 
                    : (a[settings.sortingField] < b[settings.sortingField]) ? -1 : 0)
        }

        return val;

    })

    return list
}


/*
 * Vertailulistaan kohdistettava haku
 */
const setColleaquesSearch = (state, str) => {

    let newColleaguesList = setupColleaguesList(
        state.compset, 
        state.originalColleaquesList, 
        Object.values(state.colleaguesListSortingOptions).filter(o => o.isActive)[0],
        str
    )

    return {
        ...state,
        colleaguesList: newColleaguesList,
        colleaguesListSearchStr: str

    }

}


/*
 * Päivitetään (kriitikkojen)vertailulistan lajitteluperuste
 */ 
const setCollequeListSorting = (state, criteria) => {

    /*
     * Huom. Ompas yllättävän hankalaa objektin sywäkloonaus
     */
    let newColleaguesListSortingOptions = updateColleaqueListSorting(
        criteria, 
        JSON.parse(JSON.stringify(state.colleaguesListSortingOptions))
    );

    let newColleaguesList = setupColleaguesList(
        state.compset, 
        state.originalColleaquesList, 
        Object.values(newColleaguesListSortingOptions).filter(o => o.isActive)[0],
        state.colleaguesListSearchStr
    )
 
    return {
        ...state,
        colleaguesList: newColleaguesList,
        colleaguesListSortingOptions: newColleaguesListSortingOptions
    }
}

/*
 * Päivitetään vertailulistan lajitteluvaihtoehdot
 * 
 * @param val: millä perusteella lista lajitellaan [byCount, byName]
 */
const updateColleaqueListSorting = (val, s) => {

    let settings = {...s}

    // eslint-disable-next-line no-unused-vars
    for (const [k, v] of Object.entries(settings)) {

        if(v.value === val)
            v.isActive = true
        else
            v.isActive = false
    }   

    return settings

}

/*
 * Päivitetään vertailtavana oleva kriitikko
 * - mikäli palvelimelta on luettu uuden kriitikon tiedot, liitetään nämä vertailuaineistoon
 */
const updateComparedColleaque = (state, data, compId) => {

    let newCompId = compId;                 // - vertailuun valitun kriitikon id-tunnus

    let loadedCompReviews = null;

    /*
     * @todo: Päivitä palvelimen palaluttama kentännimi stars -> starsAverage, jotta
     *        ei turhaan tarvi käydä listaa läpi
     */
    if(data !== null){

        loadedCompReviews = data.collequeReviews.map(r => {

            return {
                criticID: r.criticID, 
                googleID: r.googleID, 
                starsAverage: r.stars
            }
        })

    }



    let newCompset = state.compset;         // - aiemmin tiedossa olevat muiden antamat arvosanat

    /* Lisätään tarvittaessa luetut arvosanat muiden kriitikkojen antamiin arvosanojen taulukkoon */
    if(loadedCompReviews !== null) {    

        newCompset = newCompset.concat(
            {
                id: newCompId,
                reviews: loadedCompReviews
            }            
        )

    };


    /* 
     * Aktivoidaan vertailuun valittu arvostelija kolleegat kokoavalta nimilistalta
     */
    let newColleaguesList = state.colleaguesList.map(c => {
        let id = c.id;

        /*
         * Mikäli vertiluarvosanat luettiin juuri palvelimelta päivitetään "saatavuus"
         */
        let availeable = id===newCompId?true:c.availeable

        return {
            ...c,
            active: id===newCompId?true:false,
            availeable: availeable            
        }
    });


    let newCurrentPage = 1;

    let visibleData = getPresentedReviewsList(
        state.data, 
        state.searchStr, 
        state.sortingField, 
        state.sortingOrder, 
        getActiveCompData(newCompId, newCompset),
        state.selectedMovies
    );

    let scatterPlotData = visibleData.map(d => [d.starsAverage, d.compStars]);

    /* Jaotetellaan elokuvat sen perustella, kumpi antoi enemmän tähtiä (aktiivinen kriitikko vai vertailussa oleva) */
    let newShares = getShares(visibleData);
    newShares = wrapShares(newShares, false);

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = visibleData.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   visibleData = getVisibleItems(visibleData, newCurrentPage, state.itemsPerPage);

   let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

   /* Päivitetään arvosanataulukon otsikot */
   let newHeaders = updateHeaders(newColleaguesList, getHeaders())

   return {
        ...state,
        activeCompId: newCompId,
        colleaguesList: newColleaguesList,
        compset: newCompset,
        currentPage: newCurrentPage,
        headers: newHeaders,
        loading: false,
        paginationLinks: paginationLinks,
        scatterPlotData: scatterPlotData,
        shares: newShares,
        visibleData: visibleData
    }
}


/*
 * Kriitikolla on enemmän arvosteluita, kuin mitä kerrallaan näytölle mahtuu
 * - päivitetään sivulla näytettävä lista
 */
const updateCurretPage = (state, page) => {

    let newCurrentPage = page;

    let visibleData = getPresentedReviewsList(
        state.data, 
        state.searchStr, 
        state.sortingField, 
        state.sortingOrder, 
        getActiveCompData(state.activeCompId, state.compset),
        state.selectedMovies
    );

    /*
     * Sivutukseen tarvittava tieto
     */
   let itemsTotal = visibleData.length;
   let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);


   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   visibleData = getVisibleItems(visibleData, newCurrentPage, state.itemsPerPage);

   let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

   return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: visibleData
    }


}

/*
 * Vaihdetaan arvosanat kokoavan taulukon sarakeotsikon arvoksi vertailussa olevan kriitikon nimi
 */
const updateHeaders = (colleaguesList, headers) => {

    let name = colleaguesList
        .filter(c => c.active)[0]
        .name

    return headers.map(header => {

        let field = header.field;
        let nimi = header.name

        return {
            ...header,
            name: field === "compStars"?name:header.name
        }

    })

}

/*
 * Sivulle syötettyyn hakutermiin reagointi
 * - haku voi kohdistua joko arvosteltujen elokuvien listaan ja 
 *   samoja elokuvia arvostelleiden kriitikkojen nimilistaan.
 */
const updateSearchSetting = (state, str, target) => {

    if(target==='primary')
        return setReviewsSearchSettings(state, str);

    return setColleaquesSearch(state, str);
}


const updateSelectedMoviesEmphasis = (state, data) => {

    let newSelectedMovies = data;

    let visibleData = getPresentedReviewsList(
        state.data, 
        state.searchStr, 
        state.newField, 
        state.newOrder,
        getActiveCompData(state.activeCompId, state.compset),
        newSelectedMovies
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = visibleData.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;


   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   visibleData = getVisibleItems(visibleData, newCurrentPage, state.itemsPerPage);

   let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);



   return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        selectedMovies: newSelectedMovies,
        visibleData: visibleData
    }
}

/*
 * Kriitikon arvostelemien elokuvien listan lajittelujärjestyksen muutos
 */
const updateSortingSettings = (state, field)  => {

    let newField = field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    let visibleData = getPresentedReviewsList(
        state.data, 
        state.searchStr, 
        newField, 
        newOrder,
        getActiveCompData(state.activeCompId, state.compset),
        state.selectedMovies
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = visibleData.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);
    
    let newCurrentPage = 1;

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    visibleData = getVisibleItems(visibleData, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        sortingField: newField,
        sortingOrder: newOrder,
        visibleData: visibleData
    }
}


/*
 * Lisätää grafiikassa esitettävään arvosanajakaumaan (parempi, sama, huonompi)
 * tieto siitä onko kyseessä:
 * - uusi jakauma (esim. aktivoidaan uusi vertailukriitikko)
 * - aktivointiin perustuvan suodatuksen aikana tapahtuvaan hakutermin muutokseen
 *   reagointi
 */
const wrapShares = (shares, zoomed) => {

    return {
        shares: shares,
        zoomed: zoomed
    }
}

const singleReviewerSlice = createSlice({
    name: 'singleReviewer',
    initialState,
    reducers: {
        fetchingData(state, action) {

            const { data, loading } = action.payload;

            if(loading) {
                return {
                    ...state,
                    loading: true
                }
            }

            return displayReviewerData(state, data);
        },
        emphasizeSelectedMovies(state, action) {

            const { data } = action.payload;

            return updateSelectedMoviesEmphasis(state, data);

        },
        setComparedReviewer(state, action){

            const { data, compId, loading } = action.payload;

            if(loading) {
                return {
                    ...state,
                    loading: true
                }
            };

            return updateComparedColleaque(state, data, compId);
        },
        setCurretPage(state, action) {
            const { page } = action.payload;
            return updateCurretPage(state, page);
        },
        setSearchSettings(state, action) {
            const { str, target } = action.payload;

            return updateSearchSetting(state, str, target);
        },
        setSortingSettings(state, action) {

            const { field } = action.payload;
            return updateSortingSettings(state, field);

        },
        setColleaqueListSortingCriteria(state, action) {

            const { criteria } = action.payload;
            return setCollequeListSorting(state, criteria);

        },

    }
})

export const {
    emphasizeSelectedMovies,
    fetchingData,
    setComparedReviewer,
    setColleaqueListSortingCriteria,
    setCurretPage,
    setSearchSettings,
    setSortingSettings
} = singleReviewerSlice.actions;

export const changeComparedColleaque = (compId) => {

    return async dispatch => {

        dispatch(setComparedReviewer({
            loading: false,
            compId: compId,
            data: null
        }));

    }
};

export const initializeReviewer = (id) => {

    return async dispatch => {

        dispatch(fetchingData({
            loading: true,
            data: null
        }))

        // const sbog = await movieService.getStarsBasedOnGenres(id);
        const sRew = await movieService.getCriticDetails(id);
        // console.log(sRew);

        dispatch(fetchingData({
            loading: false,
            data: sRew.data
        }))

    }

};

/*
 * loadColleagueData(id, colleague.id)
 */
export const loadColleagueData = (id, compId) => {

    return async dispatch => {

        dispatch(setComparedReviewer({
            loading: true,
            compId: compId,
            data: null
        }));

        const sbog = await movieService.getCollequeReviews(id, compId);
        console.log(sbog)

        dispatch(setComparedReviewer({
            loading: false,
            compId: compId,
            data: sbog.data
        }))
    }
};

/* 
 * Sivun toisessa reunassa on grafiikka, joka esittää kuinka monelle elokuvalle
 * kriitikko antoi paremman arvosana kuin vertailuun valittu kriitikko jne.
 * 
 * Kun grafiikasta valitaan jokin kolmesta sektorista (parempi, sama, huonompi) 
 * suodatatetaan näkyville vain ne elokuvat, joille on kriitikot antoivat valinnan
 * mukaiset arvosanat.
 */
export const setEmphasizedMovies = (arr) => {

    return dispatch => {

        dispatch(emphasizeSelectedMovies({
            data: arr
        }));
    }

}

/*
 * Kriitikkolistan lajittelujärjestyksen vaihto
 */
export const updateCompListSorting = (val) => {

    return dispatch => {

        dispatch(setColleaqueListSortingCriteria({criteria: val}))
    }

}



export default singleReviewerSlice.reducer;