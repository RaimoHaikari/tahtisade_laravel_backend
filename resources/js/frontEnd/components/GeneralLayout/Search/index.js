import {
    Container,
    SearchIcon,
    Input
} from "./searchElements"

const Search = ({ changeHandler, value }) => {
    return (
        <Container>
            <SearchIcon />
            <Input
                type="text"
                placeholder="Search"
                value={value}
                onChange={e => changeHandler(e.target.value)}
            />
        </Container>
    );
};

export default Search;