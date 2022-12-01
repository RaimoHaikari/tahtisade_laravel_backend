import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeGenre } from "../../reducers/singleGenreReducer";

import Togglable from "../../components/GeneralLayout/Togglable"; 
import GenreCard from "../../components/SingleGenre";
import GenreList from "../../components/SingleGenre/GenreList";
import Info from "../../components/SingleGenre/Info";
import CountDown from '../../components/Countdown';

import {
    ContentWrapper,
} from "../../components/GeneralLayout/SingleItem/elements2022";


const Genre = () => {

    const dispatch = useDispatch();
 
    const { data, loading, name } = useSelector(state => {

        const genre = state.singleGenre;
        const activeGenre = genre.activeGenre;

        const name = activeGenre.data !== null
            ? activeGenre.data.name
            : ""

        return {
            ...genre,
            name: name
        }
    });

    const id = useParams().id;

    useEffect(() => {
        dispatch(initializeGenre(id));
    }, []);


    const displayContent = () => {

        return(
            <div className="container">
                <ContentWrapper>

                    <div></div>
                    <div className="eka">
                        <h3>{name}</h3>
                    </div>
                    <div></div>

                    <div className="kolmas">
                        <Togglable buttonLabel="Vertailu">
                            <GenreList />
                        </Togglable>
                    </div>
                    <div>
                        <GenreCard />
                    </div>
                    <div className="toka">
                        <Togglable buttonLabel="Ohje">
                            <Info />
                        </Togglable>
                    </div>

                </ContentWrapper>
            </div>
        )
    }

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

export default Genre;