import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initialize } from '../../reducers/recommenderReducer';

import Dashboard from "../../components/Recommendations/dashboard"

const Recommendations = () => {

    const dispatch = useDispatch();

    const { loading, data } = useSelector(state => state.recommender);

    useEffect(() => {

        if(data === null)
            dispatch(initialize())

    }, [data])

    return (
        <>
        {
            loading === true
            ? <div>L.O.A.D.I.N.G ....</div>
            : data === null
                ? null
                : <Dashboard />
        }
        </>
    );
};

export default Recommendations;