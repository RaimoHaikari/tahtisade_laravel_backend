import { useDispatch, useSelector } from "react-redux";

import {
    CONTAINER,
    LABEL,
    INPUT
} from "./genrelistElements";

import { updateCompGenre } from "../../../reducers/singleGenreReducer"
 
const GenreList = () => {

    const dispatch = useDispatch();

    const { data, id, compName } = useSelector(state => {

        let a = state.singleGenre;
        let compGenre = state.singleGenre.compGenre;

        return {
            id: a.activeGenre.id,
            data: a.data,
            compName: compGenre.data.name
        }
    });

    return (
        <CONTAINER>
            {
                data.map((d, index) => {

                    return (
                        <LABEL
                            htmlFor={`rb_${index}`}
                            disabled={d.name === id}
                            compared={d.name === compName}
                            key={index}
                        >
                            <INPUT 
                                type="radio"
                                name="genreVertailu"
                                id={`rb_${index}`}
                                disabled={d.name === id}
                                className="radioInput"
                                onClick={ () => dispatch(updateCompGenre(d.name))}
                            />

                            <div className="radioRadio"></div>
                            {d.name}
                        </LABEL>
                    )
                })
            }
        </CONTAINER>
    );
};

export default GenreList;