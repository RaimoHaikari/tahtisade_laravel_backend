import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Doctors from '../../../../../images/static-assets-upload7099622458029120504.png'

/*  */
export const WRAPPER = styled.div`
    
    display: grid;
    grid-template-columns: minmax(300px, 1fr);
    justify-content: center;
    grid-gap: ${({theme}) => theme.size.size600};

    margin: ${({theme}) => theme.size.size600};
    

    @media screen and (min-width:  ${({theme}) => theme.breakPoint.sm}){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: ${({theme}) => theme.breakPoint.md}){
        grid-template-columns: repeat(3, 1fr);
    }

`;

export const KONTTI = styled(Link)`

    box-shadow: 0px 2px 8px 0px gray;
    text-align: center;
    border-radius: ${({theme}) => theme.size.size500};
    
    position: relative;
    background:  ${({theme}) => theme.color.clrNeutral100};

    overflow: hidden; /* Jotta pyöristys pysyy näkyvissä */

    text-decoration: none;
    outline: 1px solid navy;

    SVG {
        display: inline;
    }

    &: link {
        color: ${({theme}) => theme.color.clrPrimary400}};
    }

    &: visited {
        color: ${({theme}) => theme.color.clrPrimary400}};
    }
`;

export const BANNER = styled.div`
    position: absolute;
    height: ${({theme}) => theme.size.size900};
    width: 100%;
    
    background-image: url(${Doctors});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const PROFILEIMAGE = styled.img`
    width:  ${({theme}) => theme.size.size900};
    clip-path: circle(60px at center); 
    margin-top: ${({theme}) => theme.size.size600}; 
    margin-bottom: ${({theme}) => theme.size.size100}};
    display: initial;
`;


export const H1 = styled.h1`
    font-size: ${({theme}) => theme.fontSize.fs600}};
    margin-bottom: ${({theme}) => theme.size.size100}};
    margin-top: ${({theme}) => theme.size.size100}};
`;

/*
        font-weight: ${({theme}) => theme.fontWeight.fwSemiBold}}
        margin-right: 15px;
*/
export const P = styled.p`
    /* margin: 1rem 0.2rem; */
    margin-bottom: ${({theme}) => theme.size.size200}};
    
    font-size: ${({theme}) => theme.fontSize.fs500}};
    
    span {
        margin-right: ${({theme}) => theme.size.size200};
    }
`;

export const BUTTON = styled.button`
    width: 100%;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: navy;
    padding: 1rem;
`;