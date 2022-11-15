import { useState } from "react";

import {
    SearchContainer,
    INPUT
} from "./searchElements";

const Search = ({onSearch, searchStr = ''}) => {

    const [search, setSearch] = useState("");

    const onInputChange = value => {

        setSearch(value);
        onSearch(value);

    }


    return (
        <SearchContainer>
            <INPUT
                type="text"
                placeholder="Search"
                value={searchStr}
                onChange={e => onInputChange(e.target.value)}
            />        
        </SearchContainer>

    );
};

export default Search;