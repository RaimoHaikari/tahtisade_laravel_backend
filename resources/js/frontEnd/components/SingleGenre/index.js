import { useSelector } from "react-redux";

import BarChart from "./BarChart";
import { Tooltip } from "./elements";

import {
    H1,
    CONTAINER,
    TABLE,
    TBODY,
    TR,
    TD
} from "../SingleMovie/moviecardElements";

const SingleGenre = () => {

    const { name, total, nOfReviews, compName } = useSelector(state => {

        let d = state.singleGenre.activeGenre.data;
        let comp = state.singleGenre.compGenre;


        return {
            ...d,
            compName: comp.data.name
        }
    })

    return (
        <CONTAINER>
            <H1>{name}</H1>
            <BarChart />

            <TABLE>
                <TBODY>
                    <TR>
                        <TD className="movieCardTitle">Elokuvia yhteensä</TD>
                        <TD>{total}</TD>
                    </TR>
                    <TR>
                        <TD className="movieCardTitle">Arvosteluja yhteensä</TD>
                        <TD>{nOfReviews}</TD>
                    </TR>
                    <TR>
                        <TD className="movieCardTitle">Vertailuluokka</TD>
                        <TD>{compName}</TD>
                    </TR>
                </TBODY>
            </TABLE>
        </CONTAINER>
    );
};

export default SingleGenre;