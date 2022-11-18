import styled from 'styled-components';

/*
 * Y K S I T T Ä I S E T  K O H T E E T
 * 
 * - E L O K U V A 
 * - G E N R E 
 * - A R V O S T E L I J A 
 */
export const Container = styled.div`
    background: ${({theme}) => theme.color.clrNeutral100};
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

export const InfoCardWrapper = styled.div`


    padding-right: ${({theme}) => theme.size.size200};
    padding-bottom: ${({theme}) => theme.size.size200};;
    padding-left: ${({theme}) => theme.size.size200};;

    margin: 0px 20px;

    display: flex;

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        flex-direction: column;
    }

`;

export const Main = styled.main`

    background-color: ${({theme}) => theme.color.clrNeutral100};
    padding-bottom: 10px;
    flex: 3;

`;

export const Aside = styled.aside`

    background-color: ${({theme}) => theme.color.clrNeutral100};
    padding: 0 5px;
    flex: 1;

`;

export const Graph = styled.aside`
    flex: 1;
    padding: 0 5px;
`;