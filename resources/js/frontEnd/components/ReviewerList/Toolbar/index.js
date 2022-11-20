import { useSelector } from "react-redux";

import Togglable from "../../GeneralLayout/Togglable";
import Slider from "../Slider";

const Toolbar = () => {

    const { data } = useSelector(state => state.reviewerList);

    return (
        <>
            {
                data
                ? <Togglable buttonLabel="Arvostelujen määrä">
                    <Slider />
                  </Togglable>
                : null
            }
        </>
    );
};

export default Toolbar;