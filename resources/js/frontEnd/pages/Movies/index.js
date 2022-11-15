import { useDispatch, useSelector } from 'react-redux';

import MovieList from "../../components/MovieList";
import Search from "../../components/MovieList/Search";
import Pagination from "../../components/MovieList/Pagination";
import Genres from '../../components/MovieList/Genres';

import {
    Aside,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/GeneralLayout/ItemList/elements";

import {
    updateSearchSetting
} from "../../reducers/sharedReducer";

const Movies = () => {

    const dispatch = useDispatch();

    const { search } = useSelector(state => state.movieList );

    return (

        <section className='padding-block-700'>

            <div className='container'>
            
                <PaginationAndSearch>
                    <Pagination store="movieList" />
                    <Search

                        onSearch={(val) => dispatch(
                            updateSearchSetting({
                                store: 'movieList',
                                str: val
                            })
                        )}

                        seachStr={search}
                    />
                </PaginationAndSearch>

                <ContentWrap>
                    <Main>
                        <MovieList />
                    </Main>
                    <Aside>
                        <Genres />
                    </Aside>
                </ContentWrap>

            </div>

        </section>
        
    );

};

export default Movies;