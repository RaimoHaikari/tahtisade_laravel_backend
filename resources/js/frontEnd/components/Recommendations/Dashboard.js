import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ScatterPlot from "../Graphs/ScatterPlot";

import {
    randomNormal,
    randomUniform,
    range
} from "d3";

import {
    fooBar,
    setPair
} from "../../reducers/recommenderReducer";

const binCount = 6;  /* Montako koria histogrammissa esitetään */

const Dashboard = () => {

    const [data, setData] = useState([]);

    const random = randomNormal(0, 1.2);

    const {_data} = useSelector(state => {

        const x = state.recommender.sharedReviews;

        //console.log(x);

        return {
            _data: x
        }

    })

    const dispatch = useDispatch();

    /*
            return [random() + 5, random() + 5]
    */
    useEffect(() => {

        const d = range(10).map(function() {
            return [randomUniform(5.5)(), randomUniform(5.5)()]
        })

        //  [[4, 4],[4, 3],[3, 4],[4, 2],[3, 3],[2, 1],[2, 3],[4, 3],[1, 2]];
        //const b = [[0, 0],[0, 5],[5, 5],[5,0]]

        setData(d);

    }, []);

    useEffect(() => {

        console.log("L", _data.length)

        if(_data.length > 0)
            setData(_data)

    }, [_data]);



    const btnHandler = () => {
        dispatch(fooBar())
    }

    //console.log(_data);

    return (
        <div>
            <button
                onClick={btnHandler}
            >
                T.E.E  J.O.T.A.I.N
            </button>
            <button onClick={() => dispatch(setPair({p1: "jouniVikman", p2: "avola"}))}>
                ASETA VERTAILTAVAT
            </button>
            <ScatterPlot
                data = { data }
                binCount = { binCount }
                nameOfComp = "nameOfComp"
                nameOfActive = "nameOfActive"
            />
        </div>
    );
};

export default Dashboard;