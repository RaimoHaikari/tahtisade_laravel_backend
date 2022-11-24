import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from "../../components/MovieList/Pagination/GeneralPagination";
import Search from "../../components/MovieList/Search";

import ScatterPlot from "../../components/Graphs/ScatterPlot";
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
    Graph
} from "../../components/GeneralLayout/SingleItem/elements";

import {
    ContentWrapper,
    PaginationAndSearch
} from "../../components/GeneralLayout/SingleItem/elements2022";


import { initializeReviewer } from "../../reducers/singleReviewerReducer";
import { updateSearchSetting } from "../../reducers/sharedReducer";

const binCount = 6;

const Critic = () => {

    const dispatch = useDispatch();

    const { compData, data, loading, reviewerData, scatterPlotData, searchStr} = useSelector(state => {

        const reviewer = state.singleReviewer;

        const compId = reviewer.activeCompId;
        const colleaguesList = reviewer.colleaguesList;

        const compData = (compId !== null && colleaguesList !== null)
            ? colleaguesList.filter(item => item.id === compId)[0]
            : null;

        return {
            ...reviewer,
            compData: compData
        }
    });

    const id = useParams().id;

    useEffect(()=>{

        if(data === null)
            dispatch(initializeReviewer(id));

    }, [data]);

    const displayContentXXX = () => {
        return (
            <InfoCardWrapper>

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
                    <ScatterPlot
                            data = { scatterPlotData }
                            binCount = { binCount }
                            nameOfActive = {reviewerData !== null ? reviewerData.name : ""}
                            nameOfComp= {compData !== null ? compData.name : ""}
                        />
                    </Togglable>
                </Graph>

          </InfoCardWrapper>            
        )
    }

    const displayContent = () => {
        return (
            <div className="container">
                <ContentWrapper>

                    <div className="content-item grid-row-span-2"></div>

                    <div className="content-item eka">
                        <h3>{reviewerData !== null ? reviewerData.name : ""}</h3>
                    </div>

                    <div className="content-item grid-row-span-2"></div>

                    <div className="content-item toka">
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
                    </div>

                    <div className="content-item">
                        <Togglable
                            buttonLabel="Vertailu"
                            openAtStart={false}
                        >
                            <Colleaques />
                        </Togglable>
                    </div>

                    <div className="content-item"><Reviews /></div>

                    <div className="content-item kolmas">
                        <Togglable
                            buttonLabel="Vertailu"
                            openAtStart= { true }
                        >
                            <ReusableD3Donut />
                            <ScatterPlot
                                data = { scatterPlotData }
                                binCount = { binCount }
                                nameOfActive = {reviewerData !== null ? reviewerData.name : ""}
                                nameOfComp= {compData !== null ? compData.name : ""}
                            />
                        </Togglable>
                    </div>              

                </ContentWrapper>
            </div>

        )
    }

    console.log(reviewerData)

    return (
        <section className='padding-block-700'>
        {
            loading === true
            ? <CountDown />
            : data === null
                ? null
                : displayContent()
        }
        </section>
    );
};

export default Critic;