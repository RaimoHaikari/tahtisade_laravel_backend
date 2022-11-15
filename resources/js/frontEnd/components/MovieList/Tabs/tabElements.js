import styled from 'styled-components';

/* ${({theme}) => theme.startScreen.borderColor}; */
export const TAB = styled.div`
    overflow: hidden;

    border-bottom-width: ${({theme}) => theme.size.size100};
    border-bottom-color: ${({theme}) => theme.color.clrNeutra900};
    border-bottom-style: solid;

    margin-bottom: ${({theme}) => theme.size.size200};

    background-color: ${({theme}) => theme.color.clrNeutral00};

    padding: 5px 0 0 0;

`;


/*
background-color: ${({ active, theme}) => active ? theme.color.clrNeutral900 : theme.color.clrNeutral100};
 */
export const BUTTON = styled.button`

    background-color: ${({ active, theme}) => active ? theme.color.clrNeutral900 : theme.color.clrAccent500};
    float: left;

    border-radius: 5px 5px 0px 0px;
    border: none;
    margin-left: ${({theme}) => theme.size.size100};
    outline: none;

    font-size: ${({theme}) => theme.fontSize.fs600};
    color:   ${({ active, theme}) => active ? theme.color.clrNeutral100 : theme.color.clrNeutral100};

    cursor: ${({active}) => active ? 'default' : 'pointer'};
    padding: ${({theme}) => theme.size.size400};
    transition: 0.3s;

    &:hover {
        background-color: ${({active, theme}) => active ? theme.color.clrNeutral900 :theme.color.clrAccent400};
    }
    
`;

export const CONTAINER = styled.div`
    display: ${({visible}) => visible ? "block" : "none"};
`;