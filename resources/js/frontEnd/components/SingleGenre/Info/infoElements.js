import styled from 'styled-components';


export const Container = styled.div`
    background-color: ${({theme}) => theme.color.clrPrimary400};
    color:  ${({theme}) => theme.color.clrNeutral100};
    padding: ${({theme}) => theme.size.size200};
    font-size: ${({theme}) => theme.fontSize.fs500};

    p {
        margin-bottom: ${({theme}) => theme.size.size300};
    }

    a {
        text-decoration: none;
        color: ${({theme}) => theme.color.clrAccent400};
    }

    ul {
        padding:  ${({theme}) => theme.size.size300};
    }

    li {
        margin-bottom: ${({theme}) => theme.size.size300};
    }

    li::marker {
        color:  ${({theme}) => theme.color.clrAccent400};
        content: '٭ ';
    }

`;