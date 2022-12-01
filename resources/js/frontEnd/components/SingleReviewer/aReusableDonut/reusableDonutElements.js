import styled from 'styled-components';

export const CONTAINER = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.color.clrNeutral100};

    & > div {
        padding:  ${({theme}) => theme.size.size300};
    }

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){

        display: none;

    }
`;