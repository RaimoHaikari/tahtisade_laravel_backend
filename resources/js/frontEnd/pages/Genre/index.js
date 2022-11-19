import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeGenre } from "../../reducers/singleGenreReducer";

import Togglable from "../../components/GeneralLayout/Togglable"; 
import GenreCard from "../../components/SingleGenre";
import GenreList from "../../components/SingleGenre/GenreList";
import Info from "../../components/SingleGenre/Info";

import {
    Container,
    InfoCardWrapper,
    Main,
    Aside,
    Graph
} from "../../components/GeneralLayout/SingleItem/elements";

const Genre = () => {

    const dispatch = useDispatch();
 
    const { data, loading } = useSelector(state => state.singleGenre)

    const id = useParams().id;

    useEffect(() => {
        dispatch(initializeGenre(id));
    }, []);


    return (
        <Container>
        {
            loading === true
            ? <p>L.A.D.A.T.A.A.N...</p>
            : data === null
                ? null
                : <InfoCardWrapper>
                    <Aside>
                        <Togglable buttonLabel="Vertailu">
                            <GenreList />
                        </Togglable>
                    </Aside>

                    <Main>
                        <GenreCard />
                    </Main>

                    <Graph>
                        <Info />
                    </Graph>
                  </InfoCardWrapper>
        }
        </Container>
    );
};

export default Genre;