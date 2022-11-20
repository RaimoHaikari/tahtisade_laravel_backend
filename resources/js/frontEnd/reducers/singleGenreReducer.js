import { createSlice } from '@reduxjs/toolkit';

/*
 * Yhteydet backEnd:iin
 */
import movieService from '../services/movies';

import { round } from "../misc/helperFunctions";

const DEFAULT_COMP_GENRE = 'Ei vertailua';
//const DEFAULT_COMP_GENRE = 'Kaikki elokuvat';


const initialState = {
    activeGenre: {id: null, data: null},             
    compGenre: {id: null, data: null},
    data: null,
    loading: false,
    maxNumbOfStars: -1
}

/*
 * Genrekohtainen elokuvien määrä on tiedossa. 
 * Lasketaan lisäksi montako arviointia kunkin genren elokuvat ovat yhteenä saaneet
 */
const countNumberOfReviews = (data) => {


    return data.map(d => {

        let sum = 0;

        d.values.forEach(e => {
            sum = sum + e.total;
        });

        return {
            ...d,
            nOfReviews: sum
        };
    })
}

const displayGenreData = (state, data, id) => {



    let newActiveId = id;                // - vertailuun valitun kriitikon id-tunnus
    let newData; 

    let _newData = data.map(d => {

        let starsObj = [];
        d.stars.forEach((d,i) => {
            starsObj.push({
                stars: `${i}`,
                total: d
            })
        })

        return {
            ...d,
            values: starsObj
        }
    });


    // - lasketaan arvostelujen määrät per genre
    newData = countNumberOfReviews(_newData);



    let activeGenreData = getGenre(newActiveId, newData);


    // - skaalataan annettujen tähtien määrät vastamaan aktiivisen genren tähtien määrää....
    newData = scaleStars(activeGenreData, newData);

    let maxNumbOfStars = findMaxNumbOfRevs(newData);

    // - haetaan vertailtava genre
    let compGenreData = getGenre(DEFAULT_COMP_GENRE, newData);

    return {
        ...state,
        activeGenre: {id: newActiveId, data: activeGenreData},
        compGenre: {id: DEFAULT_COMP_GENRE, data: compGenreData},
        data: newData,
        loading: false,
        maxNumbOfStars: maxNumbOfStars
    };
}

/*
 * Käydään kaikki (skaalatut) genret läpi ja etsitään suurin yksittäisen tähtimäärän
 * saama arvostelu
 */
const findMaxNumbOfRevs = (data) => {

    let max = 0;

    data.forEach(d => {

        d.scaled.forEach(val => {

            if(val.total > max)
                max = val.total

        })
    })

    return max;
}


/*
 * Erotetaan aineistosta aktiivisen genren tietue
 */
const getGenre = (id, data) => {

    let a = data.filter(d => {
        return d.name === id
    })


    return a[0]
}

/* 
 * Lasketaan kuinka monta kunkin tähtimäärän arvostelua vertailtavat muut genret olisivat
 * saaneet, jos niistä olisi yhtä monta arvostelua kuin aktiivisen genren elokuvista on.
 */
const scaleStars = (aGenre, data) => {

    let nOfReviewsA = aGenre.nOfReviews;

    return data.map(d => {

        let nOfReviews = d.nOfReviews
        // Ei vertailu -vaihtoehdolla ei ole yhtään arvostelua...
        let ratio = nOfReviews!==0?nOfReviewsA / nOfReviews:1

        let scaled = d.values.map(val => {
            return {
                ...val,
                total: round(ratio * val.total, 0)
            }
        })

        return {
            ...d,
            ratio: ratio,
            scaled: scaled
        }
    })

}

/*
 * Vaihdetaan vertailtavana oleva genre
 */
const etCompGenre = (state, id) => {

    let newCompId = id;

    let compGenreData = getGenre(newCompId, state.data);

    return {
        ...state,
        compGenre: {id: newCompId, data: compGenreData},
    }

}


const singleGenreSlice = createSlice({
    name: 'singleGenre',
    initialState,
    reducers: {
        fetchingData(state, action){
            const { data, loading, id } = action.payload;

            if(loading){
                return {
                    ...state,
                    loading: true
                }
            }

            return displayGenreData(state, data, id);
        },
        setCompGenre(state, action){

            const { id } = action.payload;

            return etCompGenre(state, id);
        }
    }
})

export const {
    fetchingData,
    setCompGenre
} = singleGenreSlice.actions;


/*
    return dispatch => {
        dispatch(
            setGenreFilter({
                allVisible: null,
                name: val.name,
                type: 'single'
            })
        )
    }
*/
export const updateCompGenre = (val) => {

    return dispatch => {

        dispatch(setCompGenre({
            id: val
        }))
    }
};


export const initializeGenre = (id) => {

    return async dispatch => {

        dispatch(fetchingData({
            loading: true,
            data: null,
            _data: null,
            id: null,
        }))

        const sbog = await movieService.getStarsBasedOnGenres(id);
        console.log(sbog);

        dispatch(
            fetchingData({
                loading: false,
                data: sbog.data.starsBasedOnGenre,
                id: id
            })
        )
        
    }
};

export default singleGenreSlice.reducer;