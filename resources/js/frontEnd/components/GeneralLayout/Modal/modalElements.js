import styled from 'styled-components';

/*
display:  ${props => (props.isOpen === true) ? 'hidden' : 'hidden'};
*/

export const ModalWrapper = styled.div`

    display: ${props => (props.isOpen === true) ? 'block' : 'none'};
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 125px; /* Location of the box */
    left: 0; 
    top: 0; 
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.8); /* Black w/ opacity */

    div.modal-content-BG {
        background: ${({theme}) => theme.color.clrNeutral100};
        padding:   ${({theme}) => theme.size.size300};
        margin:  ${({theme}) => theme.size.size300};;
        max-width: 60%;
    }

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){

        div.modal-content-BG {
            max-width: 100%;
        }

    }

`;

