import { useDispatch, useSelector } from "react-redux";

import {
    Aside,
    ContentWrap,
    Main,
    PaginationAndSearch
} from "../../components/GeneralLayout/ItemList/elements";

import Pagination from "../../components/MovieList/Pagination/GeneralPagination";
import ReviewerList from "../../components/ReviewerList";
import Toolbar from "../../components/ReviewerList/Toolbar";
import Search from "../../components/MovieList/Search";
import { updateSearchSetting } from "../../reducers/sharedReducer";


const Critics = () => {

    const dispatch = useDispatch();

    const { search } = useSelector(state => state.reviewerList);

    return (
        <section className='padding-block-700'>

            <PaginationAndSearch>

                <Pagination store="reviewerList" />

                <Search 
                  onSearch={(val) => dispatch(
                    updateSearchSetting({
                        store: 'reviewerList',
                        str: val
                    })
                  )}
                  searchStr = { search }
                />
            
            </PaginationAndSearch>


            <ContentWrap>
                <Main>
                    <ReviewerList />
                </Main>
                <Aside>
                    <Toolbar />
                </Aside>
            </ContentWrap>
        </section>
    );
};

export default Critics;