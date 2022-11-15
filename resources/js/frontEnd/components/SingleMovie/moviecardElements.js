import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const CONTAINER = styled.div`
    padding: 0;
    margin: 0;

    color: ${({theme}) => theme.color.clrNeutral100}
    background-color: ${({theme}) => theme.color.clrNeutral900}
`;

export const H1 = styled.h1`
    font-size:  ${({theme}) => theme.fontSize.fs700};
    text-align: left;
    margin-bottom: ${({theme}) => theme.size.size200};
`;

export const TABLE = styled.table`
    width: 100%;
    border-collapse: collapse;

    font-size:  ${({theme}) => theme.fontSize.fs600};

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        display: block;
        width: 100%;
    }
`;

export const TBODY = styled.tbody`
    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        display: block;
        width: 100%;
    }
`;

export const TR = styled.tr`

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        display: block;
        width: 100%;
        margin-bottom: ${({theme}) => theme.size.size200};
    }
`;

export const TD = styled.td`

    letter-spacing: 0.35px;
    font-weight:  ${({theme}) => theme.fontWeight.fwReqular};;

    padding: ${({theme}) => theme.size.size200};
    vertical-align: top;

    &.movieCardList {
        display: flex;
        flex-wrap:wrap;
    }
    
    &.movieCardTitle {
        font-weight:  ${({theme}) => theme.fontWeight.fwSemiBold};;
    }

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        display: block;
        width: 100%;
    }

`;

export const SPAN = styled.span`
    margin: 0 10px 5px 0;
    white-space:nowrap;
`;

export const LINKKI =  styled.a`
    background-color:  ${({theme}) => theme.color.clrNeutral900}
    color: ${({theme}) => theme.color.clrNeutral100};
    text-decoration: none;
    padding:  ${({theme}) => theme.size.size100};
    margin-right:  ${({theme}) => theme.size.size200};;
    position: relative;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid navy;
`;
