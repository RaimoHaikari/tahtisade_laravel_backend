import styled from "styled-components";

import { IoIosClose, IoMdOpen } from "react-icons/io";

export const CONTAINER = styled.div``;

export const BUTTON = styled.button`

    display: block;
    width: 100%;

    background-color: ${({theme}) => theme.color.clrAccent500};
    color:  ${({theme}) => theme.color.clrNeutral100};

    padding: ${({theme}) => theme.size.size300};
    font-size: ${({theme}) => theme.fontSize.fs600};

    cursor: pointer;

    display: flex;
    aling-items: center;
    justify-content: space-between;

`;

export const WRAPPER = styled.div`
    &.hideContent{
        display: none;
    }
`;

export const CloseIcon = styled(IoIosClose)`
    color: ${({theme}) => theme.color.clrNeutral100};
    font-size: ${({theme}) => theme.fontSize.fs700};

    &.hideIcon{
        display: none;
    }
`;

export const OpenIcon = styled(IoMdOpen)`
    color: ${({theme}) => theme.color.clrNeutral100};
    font-size: ${({theme}) => theme.fontSize.fs700};

    &.hideIcon{
        display: none;
    }
`;