import styled from "styled-components";

export const Container = styled.div`
    padding: 0 0 10px 0;
    font-size: ${({theme}) => theme.fontSize.fs600};
`;

export const FormGroup = styled.div`

    display: flex;
    flex-direction: row; 

  
    @media screen and (max-width: ${({theme}) => theme.breakPoint.xl}){
        flex-direction: column; 
    } 

    @media screen and (max-width: ${({theme}) => theme.breakPoint.md}){
        flex-direction: row; 
    }  
    
    @media screen and (max-width: ${({theme}) => theme.breakPoint.sm}){
        flex-direction: column;
    }
`;


/*
 * - If both items are set to flex-shrink:1, they will both take up half of the viewport (they shrink equally to 50%)
 * - If both are items set to flex-shrink:0, neither will shrink and they will both take up 100% of the viewport width, growing the width of the flexbox to twice that of the viewpor
 */
export const RadioColName = styled.div`

    margin-bottom:  ${({theme}) => theme.size.size300};
    margin-right: ${({theme}) => theme.size.size300};

    align-self: flex-start;

`;

export const SettingsLabel = styled.label`
    font-weight: ${({theme}) => theme.fontWeight.fwSemiBold};
    margin: 0;
`;


/*

 */
export const RadioColValue = styled.div`

    flex: 1; 

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    overflow: hidden;
    border-radius: 0px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);

    @media screen and (min-width: 400px){
        /* flex-direction: row; */
    }

    @media screen and (min-width: 576px){
        /* flex-direction: column; */
    }

`;


export const RadioWrapper = styled.div`
    flex: 1;   
`;


export const RadioLabel = styled.label`

    padding: ${({theme}) => theme.size.size300};
    margin: 0px;
    font-size: ${({theme}) => theme.fontSize.fs500};

    display: block;
    width: 100%;
    max-width: 100%;

    background: ${({theme}) => theme.color.clrNeutral100};
    color: ${({theme}) => theme.color.clrNeutral900};
    cursor: pointer;

    transition: background 0.1s;
`;

export const RadioInput = styled.input`
    display: none; 

    &:checked + ${RadioLabel} {
        background: ${({theme}) => theme.color.clrPrimary400};
        color: ${({theme}) => theme.color.clrNeutral100};
        cursor: default;
    }
`