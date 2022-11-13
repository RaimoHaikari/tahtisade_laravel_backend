import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const TABLE = styled.table`
    
    border-collapse: collapse; 
    width: 100%; 
    table-layout: auto; 
    font-size: ${({ theme }) => theme.fontSize.fs500};
    /* border-radius: 5px 5px 0 0; */
    overflow: hidden;

`;

export const THEAD = styled.thead`
    & > tr {
        background-color: ${({ theme }) => theme.color.clrNeutral900};
    }
    
`;


/*
content: '${props => props.icon }';
*/
export const TH = styled.th`
    display: table-cell;
    padding: ${({ theme }) => theme.size.size200};
    text-align: left;
    color: ${({sortingField, theme}) => sortingField ? theme.color.clrNeutral900 : theme.color.clrNeutral100};;
    cursor: ${({sortable}) => sortable ? "pointer" : "default"};
    &:before {
        display: none;
    }
    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        display:none;
    }
`;

export const TBODY = styled.tbody``;

export const TR = styled.tr`
    
    background-color: ${({ theme }) => theme.color.clrAccent100};

    &.linkToDetails {
        cursor: pointer;
    }
    &:nth-of-type(even) {
        background-color: ${({ theme }) => theme.color.clrAccent500};
        color: ${({ theme }) => theme.color.clrNeutral100};
    }
    &:last-of-type {
        border-bottom: 2px solid #009879;
    }
`;


export const TD = styled.td`

   /* border: solid 1px #ccc; */
   display: table-cell;
   padding: ${({ theme }) => theme.size.size200 };
   text-align: left;

   SVG {
    display: inline;
   }

   &:before {
       display: none;
   }

   @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
       display:block;
       &:first-child {
           padding-top: ${({ theme }) => theme.size.size100 };
       }
       &:last-child {
           padding-bottom: ${({ theme }) => theme.size.size100 };
       }
       &:before {
           content: '${({before}) => before }';
           font-weight: bold;
           width: 6.5em;
           display: inline-block;
           
       }
   }
`;

