import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from "../../components/MovieList/Pagination/GeneralPagination";
import Search from "../../components/MovieList/Search";

import Colleaques from "../../components/SingleReviewer/Colleagues";
import Togglable from "../../components/GeneralLayout/Togglable";
import Reviews from "../../components/SingleReviewer";
import ReusableD3Donut from "../../components/SingleReviewer/aReusableDonut";
import CountDown from "../../components/Countdown";

import {
    Container,
    InfoCardWrapper,
    Main,
    Aside,
    Graph,
    PaginationAndSearch
} from "../../components/GeneralLayout/SingleItem/elements";


import { initializeReviewer } from "../../reducers/singleReviewerReducer";
import { updateSearchSetting } from "../../reducers/sharedReducer";

const Critic = () => {

    const dispatch = useDispatch();

    const { data, loading, searchStr} = useSelector(state => state.singleReviewer);

    const id = useParams().id;

    useEffect(()=>{

        if(data === null)
            dispatch(initializeReviewer(id));

    }, [data]);

    return (
        <section className='padding-block-700'>
        {
            loading === true
            ? <CountDown />
            : data === null
                ? null
                : <InfoCardWrapper>
                    <Aside>
                        <Togglable
                            buttonLabel="Vertailu"
                            openAtStart={false}
                        >
                            <Colleaques />
                        </Togglable>
                    </Aside>
                    <Main>
                        <PaginationAndSearch>
                            <Pagination store="singleReviewer" />
                            <Search 
                                onSearch={(val) => dispatch(
                                    updateSearchSetting({
                                        store: 'singleReviewer',
                                        str: val
                                    })
                                )}

                                searchStr={searchStr}
                            />
                        </PaginationAndSearch>
                        <Reviews />
                    </Main>
                    <Graph>
                        <Togglable
                            buttonLabel="Vertailu"
                            openAtStart= { true }
                        >
                           <ReusableD3Donut />
                        </Togglable>
                    </Graph>
                  </InfoCardWrapper>
        }
        </section>
    );
};

export default Critic;