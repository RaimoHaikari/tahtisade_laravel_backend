import styled from 'styled-components';

export const Container = styled.div`
    
    div.percent {

        position: relative;
        z-index: 1000;
    }

    div.number {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.number h2 {
        color:${({theme}) => theme.color.clrAccent100};
        font-weight: ${({theme}) => theme.fontWeight.fwSemiBold};
        font-size: ${({theme}) => theme.fontSize.fs700};
        z-index: 1001;
    }

    h2.text {
        position: relative;
        text-align: center;
        color: ${({theme}) => theme.color.clrAccent500};
        font-weight: ${({theme}) => theme.fontWeight.fwReqular};
        font-size: ${({theme}) => theme.fontSize.fs400};
        margin-top: ${({theme}) => theme.size.size100};
    }

    @media screen and (min-width: ${({theme}) => theme.breakPoint.sm}){

        h2.text {

            font-weight: ${({theme}) => theme.fontWeight.fwSemiBold};;
            font-size: ${({theme}) => theme.fontSize.fs600};
            letter-spacing: ${({theme}) => theme.size.size100}; 
            text-transform: uppercase;
    
        }

    }  

`;


export const Svg = styled.svg`

    position: relative;
    z-index: 1000;
    width: 100%;

    
    circle {
        fill: ${({theme}) => theme.color.clrAccent400};
        stroke: ${({theme}) => theme.color.clrNeutral100};
        stroke-width: 10;
        stroke-linecap: round;
        transform: translate(0px, 0px);
    }

    circle:nth-child(2) {
        stroke-dasharray: 220;
        stroke-dashoffset: 220;
        stroke: ${({theme}) => theme.color.clrPrimary400};
    }
    
`;


