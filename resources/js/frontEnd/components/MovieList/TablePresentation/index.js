import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import parse from "html-react-parser";

import { updateSortingSetting } from "../../../reducers/sharedReducer";
import { convertAverageToStars } from "../../../misc/helperFunctions";

import { BiSortDown, BiSortUp} from 'react-icons/bi';

import {
    TABLE,
    THEAD,
    TR,
    TBODY,
    TH,
    TD
} from './tableElements'

const TablePresentation = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        headers, 
        visibleData, 
        search, 
        sortingField, 
        sortingOrder
    } = useSelector(state => state.movieList);

    const onSortingChange = (field)  => {

        dispatch(updateSortingSetting({ field: field, store: 'movieList' }));

    }

    /*
     * Korostetaan löydetyt, hakutermiä vastaavat merkkijonot
     */
    const emphasizeSearched = (str) => {
        
        let match = search;
        let replace = "<mark>"+match+"</mark>";
        let regexp = new RegExp(match, "gi");

        return parse(str.replace(regexp, replace))
    }


    const rowCliked = (d) => {

        if(d.productPage) navigate(d.productPage);

    }

    const displayTable = () => {
        return (
            <TABLE className='taulukko'>
                <THEAD>
                    <TR>
                    {
                        headers.map((header) => {

                            return (
                                    <TH
                                        sortingField = {(sortingField && sortingField === header.field)}
                                        sortable = {header.sortable}
                                        key={`${header.field}`}
                                        onClick={() => header.sortable ? onSortingChange(header.field) :null}
                                    >
                                        {
                                            (sortingField && sortingField === header.field)
                                            ? (sortingOrder === 'asc')
                                                ? <BiSortUp />
                                                : <BiSortDown />
                                            : null
                                        }
                                        {header.name}
                                    </TH>
                            )
                        })
                    }
                    </TR>
                </THEAD>

                <TBODY>
                {
                    visibleData.map((m)=> {

                        return (
                            <TR 
                                className={m.productPage?'linkToDetails':null}
                                onClick = {() => rowCliked(m)}
                                key={`${m.googleID}`}
                            >
                                <TD before="Nimi">
                                    {
                                        search !== ''
                                        ? emphasizeSearched(m.nimi)
                                        : m.nimi
                                    }</TD>
                                <TD before="Arvosteluja">{m.numberOfReviews}</TD>
                                <TD before="Keskiarvo" >{convertAverageToStars(m.averageOfReviews)}</TD>
                            </TR>
                        )
                    })
                }
                </TBODY>
            
            </TABLE>
        )
    }

    return (
        <>
            {
                visibleData
                ? displayTable()
                : null
            }
        </>
    );
};

export default TablePresentation;