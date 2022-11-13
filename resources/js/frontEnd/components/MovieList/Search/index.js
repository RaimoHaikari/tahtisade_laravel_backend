import { useState } from "react";

const Search = ({onSearch, searchStr = ''}) => {

    const [search, setSearch] = useState("");

    const onInputChange = value => {

        setSearch(value);
        onSearch(value);

    }


    return (
        <div className="search-container">
            <input
                type="text"
                className="input-search"
                placeholder="Search"
                value={searchStr}
                onChange={e => onInputChange(e.target.value)}
            />        
        </div>

    );
};

export default Search;