/*
 * Animated Range Slider In HTML, CSS, and Simple JavaScript [TUTORIAL]
 * https://www.youtube.com/watch?v=xDPZUR84D4w
 */
import styled from "styled-components";


export const Container = styled.div`
    background-color: ${({theme}) => theme.color.clrNeutral100};

    border: 1px dotted #cccccc;
    padding: ${({theme}) => theme.size.size300};

    height: 100px; 
    width: 100%;

    display: grid;
    text-align: center;
    place-items: center;


    & div.title {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    & div.title span.toRight {
        margin-left: auto;
        margin-top: auto;
    }

    & div.title span.toLeft {
        flex: 1;
        text-align: left;
    }


    & div.field {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }


    & div.limits {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    & div.limits span.max {
        margin-left: auto;
    }

`;

export const Input = styled.input`
    -webkit-appearance: none;
    height: 10px;
    background: #ddd;
    border-radius: 2px;
    outline: none;
    border: none;
    width: 100%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        background: black;
        cursor: pointer;
    }

    &::-moz-range-thumb {}
`;