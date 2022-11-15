import {
    CONTAINER,
    LABEL,
    INPUT,
    SPAN
} from './GenresElements'

const CheckBoxList = ({ changeHandler, genres }) => {

    return (
        <CONTAINER>
        {
            genres.map((genre, index) => {
                return (
                    <LABEL key={`${index}-${genre.name}`}>
                        {genre.name}
                        <INPUT 
                            type="checkbox"
                            onChange={() => changeHandler(genre.name)}
                            checked={genre.display}
                        />
                        <SPAN />
                    </LABEL>
                )
            })
        }
        </CONTAINER>
    );
};

export default CheckBoxList;