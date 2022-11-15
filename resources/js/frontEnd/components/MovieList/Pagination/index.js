import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateCurretPage } from "../../../reducers/sharedReducer";


import {
    Container,
    UL,
    LI
} from "./paginationElements";


const Pagination = ({ store }) => {

    const dispatch = useDispatch();

    const { currentPage, paginationLinks } = useSelector(state => state[store]);

    const paginationItems = useMemo(() => {

        const pages = [];

        for(let i = 0; i < paginationLinks.length; i++){

            pages.push(
                <LI
                    key={paginationLinks[i].index}
                    className={paginationLinks[i].className}
                    onClick={() => dispatch(
                        updateCurretPage({
                            store: store,
                            page: paginationLinks[i].index
                        })
                    )}
                >
                    { paginationLinks[i].label }
                </LI>
            );

        }

        return pages;


    }, [currentPage, paginationLinks])

    return (
        <Container className='paginationContainer'>

            {
                paginationLinks.length > 0
                ?  <UL>
                        {paginationItems}
                    </UL>
                : null
            }


        </Container>
    );
};

export default Pagination;