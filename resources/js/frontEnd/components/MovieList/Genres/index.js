import { useDispatch, useSelector } from "react-redux";

import Togglable from "../../GeneralLayout/Togglable";
import CheckBoxList from "./CheckBoxList";
import TextButton from "./TextButton";

import {
    updateGenresVisibility,
    updateSingleGenreVisibility
} from "../../../reducers/movieListReducer";

const Genres = () => {

    const dispatch = useDispatch();

    const { genreNames } = useSelector(state => state.movieList);

    const changeHandler = (val) => {

        console.log(". changeHandler");
        dispatch(
            updateSingleGenreVisibility({
                name: val
            })
        )
    }

    const x = [
        {
            title: "Valitse kaikki",
            clickHanler: function(){
                return dispatch(
                    updateGenresVisibility({
                        active: true
                    })
                );
            }
        },
        {
            title: "Tyhjennnä valinnat",
            clickHanler: function(){
                return dispatch(
                    updateGenresVisibility({
                        active: false
                    })
                );
            }
        }
    ];

    if(!genreNames) return null;

    return (
        <Togglable buttonLabel="Genres">
            <TextButton buttons={x} />
            <CheckBoxList
                genres={genreNames}
                changeHandler={changeHandler}
            />
        </Togglable>
    );
};

export default Genres;