import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    initializeMovie
} from "../../reducers/singleMovieReducer";

import {
    Aside,
    Container,
    InfoCardWrapper,
    Main
} from "../../components/GeneralLayout/SingleItem/elements";

import {
    ContentWrapper
} from "../../components/GeneralLayout/SingleItem/elements2022"

import MovieCard from '../../components/SingleMovie';
import Poster from '../../components/SingleMovie/Poster';
import Reviews from '../../components/SingleMovie/Reviews';
import CountDown from '../../components/Countdown';


const Movie = () => {

    const id = parseInt(useParams().id);

    const dispatch = useDispatch();

    const { data, loading } = useSelector(state => state.singleMovie);

    useEffect(() => {
        
        dispatch(initializeMovie({
            movieId: id
        }));
    
    }, []);

    
    const displayContentBAK = () => {
        return (
            <InfoCardWrapper>
                <Aside>
                    <Poster
                        src={data.img}
                        title={data.nimi}
                    />
                </Aside>
                <Main>
                    <MovieCard 
                        actors={data.actors}
                        directors={data.director}
                        distributors={data.distributor}
                        externalLinks={data.externalLinks}
                        genre={data.genres}
                        releaseDate={data.ensiIlta}                                
                        title={data.nimi}
                        writers={data.writer}
                    />
                    <Reviews
                        headers={data.headers}
                        stars={data.stars}
                        tomatoes={data.visibleData}
                    />
                </Main>
            </InfoCardWrapper>
        )
    }

    const displayContent = () => {
        return (
            <div className="container">
                <ContentWrapper>

                    <div></div>
                    <div className="eka">
                        <h3>{data.nimi}</h3>
                    </div>
                    <div></div>

                    <div className="kolmas">
                        <Poster
                            src={data.img}
                            title={data.nimi}
                        />
                    </div>

                    <div>
                        <MovieCard 
                            actors={data.actors}
                            directors={data.director}
                            distributors={data.distributor}
                            externalLinks={data.externalLinks}
                            genre={data.genres}
                            releaseDate={data.ensiIlta}                                
                            title={data.nimi}
                            writers={data.writer}
                        />
                        <Reviews
                            headers={data.headers}
                            stars={data.stars}
                            tomatoes={data.visibleData}
                        />
                    </div>


                    <div className="toka">
                    </div>

                </ContentWrapper>
            </div>
        )
    }

    return (
        <section className='padding-block-700'>
            {
                (loading === true)
                ? <CountDown />
                : data === null
                    ? null
                    : displayContent()
            }
        </section>
    );
};

/*
        <Container>
            {
                (loading === true)
                ? <CountDown />
                : data === null
                    ? null
                    : displayContent()
            }
        </Container>

*/

export default Movie;