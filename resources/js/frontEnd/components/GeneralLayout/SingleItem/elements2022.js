import styled from 'styled-components';

/*
 * Y K S I T T Ä I S E T  K O H T E E T
 *  
 * - A R V O S T E L I J A 
 */
export const ContentWrapper = styled.div`

    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr 3fr 1fr;

    .hide-on-md {
        display: block;
    }

    .grid-row-span-2 {
        grid-row: span 2;
    }

    H3 {
        font-size: ${({theme}) => theme.fontSize.fs700};
        font-weight: ${({theme}) => theme.fontWeight.fwBold};
    }

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){

        grid-template-columns: 1fr;

        .hide-on-md {
            display: none;
        }

        .eka {
            grid-column-start: 1;
            grid-row-start: 1;
        }

        .toka {
            grid-column-start: 1;
            grid-row-start: 2;
        }

        .kolmas {
            grid-column-start: 1;
            grid-row-start: 3;
        }

    }

`;

export const PaginationAndSearch = styled.div`

    padding-right: 2px;
    padding-bottom: 2px;
    padding-left: 2px;

    display: flex;

    & .paginationContainer {
        margin-right: auto;
    }

`;