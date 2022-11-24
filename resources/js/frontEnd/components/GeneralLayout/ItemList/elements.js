import styled from 'styled-components';

/*
 * L U E T T E L O T
 *
 * - E L O K U V A T
 * - G E N R E T
 * - A R V O S T E L I J A T
 */
export const PaginationAndSearch = styled.div`

    padding: ${({theme}) => theme.size.size200};

    

    display: flex;

    & .paginationContainer {
        margin-right: auto;
    }
`;


export const ContentWrap = styled.div`

    color: ${({ theme }) => theme.color.clrNeutral900};
    display: flex;

    @media screen and (max-width:  ${({theme}) => theme.breakPoint.md}){
        flex-direction: column;
    }
`;


export const Main = styled.main`
    margin: ${({ theme }) => theme.size.size200};
    background-color:  ${({ theme }) => theme.color.clrNeutral100};
    flex: 4;
`;

export const Aside = styled.aside`
    margin: ${({ theme }) => theme.size.size200};
    /* background-color:  ${({ theme }) => theme.color.clrNeutral900}; */
    flex: 1;

    @media screen and (max-width: 800px){
        flex-direction: column;
        order: -1;
    }
`;