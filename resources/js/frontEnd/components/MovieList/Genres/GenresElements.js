import styled from 'styled-components';

/*
 * w3schools
 *
 * How TO - Custom Checkbox
 * https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
 */
export const CONTAINER = styled.div`
    background-color: ${({theme}) => theme.color.clrNeutral100};
    padding:  ${({theme}) => theme.size.size100};

    display: flex;
    flex-direction: column;

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){

        flex-direction: row;
        flex-wrap: wrap;

    }

`;

export const SPAN = styled.span`
    position: absolute;
    top: ${({theme}) => theme.size.size100};;
    left: 0;
    height: ${({theme}) => theme.size.size400};
    width:  ${({theme}) => theme.size.size400};
    background-color: ${({theme}) => theme.color.clrPrimary400};

    &:after {
        content: "";
        position: absolute;
        display: none;      
    }
`;

/* Hide the browser's default checkbox */
export const INPUT = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ SPAN {
        background-color:  ${({theme}) => theme.color.clrPrimary400};
    }
`;


/* 
 * Customize the label (the container)
 * ~ Otsikkoteksi
 */
export const LABEL = styled.label`

    display: block;
    position: relative;

    padding-left:  ${({theme}) => theme.size.size500};

    margin-bottom:  ${({theme}) => theme.size.size400};

    cursor: pointer;
    font-size: ${({theme}) => theme.fontSize.fs600};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover INPUT ~ SPAN {
        background-color: ${({theme}) => theme.color.clrAccent400};;
    }

    /* ~ VALINTAMERKKI */
    ${SPAN}:after {
        left: 5px;
        top: 0px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    ${INPUT}:checked ~ ${SPAN}:after {
        display: block;
    }

    
    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){

        display: inline;

        flex-grow: 1; 
        flex-basis: 0; 
    }
    
`;
