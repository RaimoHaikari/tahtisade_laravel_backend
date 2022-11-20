import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeneralTabs from "../MovieList/Tabs/generalTabs";
import CountDown from "../Countdown";

import { initializeReviewers } from "../../reducers/reviewerListReducer";

const ReviewerList = () => {

    const dispatch = useDispatch();

    const { loading, visibleData } = useSelector(state => state.reviewerList);

    const errorMsg = () => {

        return (
            null
        )
    }

    useEffect(() => {

        if(visibleData === null) {
            dispatch(initializeReviewers())
        }

    }, [visibleData]);

    return (
        <div>
            {
                loading === true
                ? <CountDown />
                : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="reviewerList" />
            }
        </div>
    );

}

export default ReviewerList;