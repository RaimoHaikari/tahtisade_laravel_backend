import { useDispatch, useSelector } from "react-redux";

import { updateDisplayType } from "../../../reducers/sharedReducer";

import TablePresentation from "../TablePresentation";

const GeneralTabs = ({store}) => {

    const dispatch = useDispatch();

    const { displayTypes } = useSelector(state => state[store]);

    const displayContent = (d, i) => {

        // eslint-disable-next-line default-case
        switch(d.content) {
            case 'MOVIELIST_TABLE':
                return <TablePresentation key={`${i}-tbl`} />
            /*
            case 'MOVIELIST_CARD':
                return <Card key={`${i}-card`} />
            case 'GENRELIST_TABLE':
                return <GeneralTable key={`${i}-tbl`} store='genreList' />
            case 'REVIEWERLIST_TABLE':
                return <GeneralTable key={`${i}-tbl`} store='reviewerList' />
            */

          }

    }


    const getTabContent = () => {
        
        return (
            <>
            {
                displayTypes.map((d,i) => {
                    return (
                        <div
                            key = {`generalTabs-${store}-content-${i}`}
                        >
                        {
                            displayContent(d, i)
                        }
                        </div>
                    )
                })
            }
            </>
        )

    }

    const getTabLinks = () => {
        
        return (
            <div className="tab">
            {
                displayTypes.map((d,i) => {
                    return (
                        <button
                            key={`generalTabs-${store}-tabs-${i}`}
                            onClick = {() => dispatch(
                                updateDisplayType({
                                    type: d.name,
                                    store: store
                                })
                            )}
                            className = {d.active ? "active" : ""}
                        >
                            {d.name}
                        </button>
                    )
                })
            }
            
            </div>
        )
    }


    return (
        <div>
            { getTabLinks() }
            { getTabContent() }
        </div>
    );
};

export default GeneralTabs;