import { useDispatch, useSelector } from "react-redux";

import {
    Aside,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/GeneralLayout/ItemList/elements";

import GenreList from "../../components/GenreList";
import Pagination from "../../components/MovieList/Pagination/GeneralPagination";
import Search from "../../components/MovieList/Search";

import { updateSearchSetting } from "../../reducers/sharedReducer";


const Genres = () => {

    const dispatch = useDispatch();

    const { search } = useSelector(state => state.genreList);

    return (
        <section className='padding-block-700'>
            <PaginationAndSearch>
                <Pagination 
                    store="genreList"
                />
                <Search
                    onSearch={(val) => dispatch(
                        updateSearchSetting({
                            store: 'genreList',
                            str: val
                        })
                    )}
                    searchStr={search}
                />
            </PaginationAndSearch>

            <ContentWrap>
                <Main>
                    <GenreList />
                </Main>
                <Aside></Aside>
            </ContentWrap>
        </section>
    );
};

export default Genres;