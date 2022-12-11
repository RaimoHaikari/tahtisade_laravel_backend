import styled from 'styled-components';

/*
    maxWidth: '100%';
    height: 'auto';
    height: 'intrinsic';
*/
export const Svg = styled.svg`
    outline: 1px solid navy;

`;

export const Rect = styled.rect`
    fill: ${({theme}) => theme.color.clrAccent400};
`;

export const Text = styled.text`
    font-size: ${({theme}) => theme.size.fs300};
    fill: ${({theme}) => theme.color.clrPrimary400};
`;

export const Line = styled.line`
    stroke: ${({theme}) => theme.color.clrPrimary400};

    &.dotted {
        stroke-dasharray: 1;
        stroke: navy;
    }

`;