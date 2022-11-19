import styled from 'styled-components';

export const Tooltip = styled.div`

    background-color:  ${({theme}) => theme.color.clrNeutral100};;
    color: ${({theme}) => theme.color.clrNeutral900}; 

    border: 1px solid ${({theme}) => theme.color.clrPrimary400};;

    border-radius: ${({theme}) => theme.size.size300};			
    pointer-events: none;	

    padding: ${({theme}) => theme.size.size300};

    position: absolute;
    opacity: 0;

    & p span {
        margin: 0 5px 0 5px;
    }

    & p:first-of-type {
        font-weight: bolder;
    }

    & p:first-of-type span{
        margin: 0 5px 0 0;
    }
`;