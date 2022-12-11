import styled from 'styled-components';

export const SearchContainer = styled.div`

    @media screen and (min-width:  ${({theme}) => theme.breakPoint.sm}){
        margin-left: auto;
    }
`;

export const INPUT = styled.input`
    display:inline-block;
    padding:  ${({theme}) => theme.size.size400};;
`;