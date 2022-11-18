import styled from 'styled-components';

import { scDebugStepOver } from "react-icons/vsc";
import { IoMdSearch } from "react-icons/io";


export const Container = styled.div`
    display: flex;
`;

export const SearchIcon = styled(IoMdSearch).attrs(props => {

    return({
        size: props.size || "2em",
        color: "black",
    })

})`
    margin-right: 4px;
`;

export const Input = styled.input`
    padding: 0.5em;
    width: 100%;
`;