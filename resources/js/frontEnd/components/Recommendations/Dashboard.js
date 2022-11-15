import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ScatterPlot from "../ScatterPlot";

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

    console.log(_data);

    return (
        <div>
            <button
                onClick={btnHandler}
            >
                T.E.E  J.O.T.A.I.N
            </button>
            <button onClick={() => dispatch(setPair({p1: "Lisa Rose", p2: "Gene Seymour"}))}>
                ASETA VERTAILTAVAT
            </button>
            <ScatterPlot
                data = { data }
                binCount = { binCount }
            />
        </div>
    );
};

export default Dashboard;