import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../reducers/userReducer"



const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(logoutUser());
        navigate('/');

    }, []);

    return (null);
};

export default Logout;