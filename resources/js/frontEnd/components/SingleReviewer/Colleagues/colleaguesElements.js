import styled from 'styled-components';

export const CONTAINER = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.color.clrNeutral100};

    & > div {
        padding: ${({theme}) => theme.size.size200};
    }

    & > div.listWrapper {

        max-height: 400px;
        overflow-y: auto;
    }
`;


export const CARD = styled.div`

    color: ${({theme}) => theme.color.clrNeutral900};

    padding: 2px;
    margin-bottom: ${({theme}) => theme.size.size200};;
    border-bottom: 1px dotted  ${({theme}) => theme.color.clrPrimary400};;

    cursor: pointer;

    &:hover {
        background: ${({theme})  => theme.color.clrAccent400};
        color: ${({theme}) => theme.color.clrNeutral100};
    }

    &.active {
        background-color: ${({theme}) => theme.color.clrPrimary400};
        color: ${({theme}) =>  theme.color.clrNeutral100};
        cursor: default;
    }

    & P {
        padding: 5px 0;
    }
`;