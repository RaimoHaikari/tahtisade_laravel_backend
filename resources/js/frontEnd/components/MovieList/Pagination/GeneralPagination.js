import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurretPage } from "../../../reducers/sharedReducer";

import {
    Container,
    UL,
    LI
} from "./paginationElements";

const GeneralPagination = ({ store }) => {

    const dispatch = useDispatch();

    const {currentPage, paginationLinks} = useSelector(state => state[store]);

    const paginationItems = useMemo(() => {

        const pages = [];

        for(let i = 0; i < paginationLinks.length; i++){

            pages.push(
                <LI 
                    key={paginationLinks[i].index}
                    className={paginationLinks[i].className}
                    onClick={() => dispatch(updateCurretPage({
                        'store':store,
                        'page': paginationLinks[i].index
                    }))}
                >
                    <span>{paginationLinks[i].label}</span>
                </LI>                
            )
        }

        return pages;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, paginationLinks]);

    return (
        <Container className='paginationContainer'>
            <UL>
                {paginationItems}
            </UL>
        </Container>
    );
};

export default GeneralPagination;