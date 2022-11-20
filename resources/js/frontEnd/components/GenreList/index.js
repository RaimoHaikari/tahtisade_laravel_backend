import { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";

import { initializeGenres } from "../../reducers/genreListReducer";

import GeneralTabs from "../MovieList/Tabs/generalTabs";
import CountDown from '../Countdown';

const GenreList = () => {

    const dispatch = useDispatch();

    const { loading, data } = useSelector(state => state.genreList);



    useEffect(() => {

        if(data === null)
            dispatch(initializeGenres());

    }, [data]);



    return (
        <>
        {
            loading === true
            ? <CountDown />
            : data === null
                ? null
                : <GeneralTabs store="genreList" />
        }
        </>
    );
};

export default GenreList;