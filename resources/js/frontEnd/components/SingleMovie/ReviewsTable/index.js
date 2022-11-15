import styled from 'styled-components';

import {
    BsFillStarFill,
    BsStarHalf
} from "react-icons/bs";

const LINKKI = styled.a`
    background-color:  ${({theme})  => theme.color.clrNeutral100};
    color: ${({theme})  => theme.color.clrNeutral900};
    text-decoration: none;
    padding: 0;
    margin: 0;
    position: relative;
    display: inline-block;
    border-radius: 2px;
`;

/*
 * 27.7.2022 
 * - Toiminto siirretty misc/helperFunctions moduuliin
 */
const visualizeStars = (avg) => {

    let val = [];

    for(let i = 0; i < Math.floor(avg); i ++)
        val.push(<BsFillStarFill />);

    if(avg % 1 >= 0.5)
        val.push(<BsStarHalf />);

    return val;
};

const getSourceLink = (title, to) => {
    return (
        <LINKKI
            target="_blank"
            href={to}
        >
            {title}
        </LINKKI>
    )
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSourceLink,
    visualizeStars
}