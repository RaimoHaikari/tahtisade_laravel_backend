import styled from 'styled-components';

export const Container = styled.div`

    margin-bottom:  ${({theme}) => theme.size.size400};

    .section-title {
        text-transform: uppercase;
        border-top: 2px double navy;
        border-bottom: 4px double navy;
        background-color: ${({theme}) => theme.color.clrPrimary400};
        color: ${({theme}) => theme.color.clrAccent100};
        padding-left: ${({theme}) => theme.size.size200};
    }
`;