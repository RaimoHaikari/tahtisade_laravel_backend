import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralTabs from "./Tabs/generalTabs";

import { initializeMovies } from "../../reducers/movieListReducer";

const MovieList = () => {

    const dispatch = useDispatch();

    const { moviesLoading, visibleData } = useSelector(state => state.movieList);

    useEffect(() => {

        if(visibleData === null)
            dispatch(initializeMovies())

    }, [visibleData]);


    return (
        <>
            {
                moviesLoading === true
                ? <p>L.A.D.A.T.A.A.N</p>
                : <GeneralTabs store='movieList' />
            }
        </>
    );
};

export default MovieList;