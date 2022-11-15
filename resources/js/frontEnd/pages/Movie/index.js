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

import MovieCard from '../../components/SingleMovie';
import Poster from '../../components/SingleMovie/Poster';
import Reviews from '../../components/SingleMovie/Reviews';


const Movie = () => {

    const id = parseInt(useParams().id);

    const dispatch = useDispatch();

    const { data, loading } = useSelector(state => state.singleMovie);

    useEffect(() => {
        
        dispatch(initializeMovie({
            movieId: id
        }));
    
    }, []);

    return (
        <Container>
            {
                (loading === true)
                ? <p>L.A.D.A.T.A.A.N</p>
                : data === null
                    ? null
                    : <InfoCardWrapper>
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
            }
        </Container>
    );
};

export default Movie;