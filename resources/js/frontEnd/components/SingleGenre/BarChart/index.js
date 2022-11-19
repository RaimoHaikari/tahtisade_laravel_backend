import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select } from "d3";
import { d3BarChact } from "./d3BarChart";

import './d3BarChart.css';

const BarChart = () => {

    const dispatch = useDispatch();

    const { id, acData, cgData, maxNumbOfStars } = useSelector(state => {

        let ac = state.singleGenre.activeGenre;

        return {
            id: ac.id,
            acData: ac.data.values,
            cgData: state.singleGenre.compCenre.data.scaled,
            maxNumbOfStars: state.singleGenre.maxNumbOfStars
        }

    });

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(300);

    const refElement = useRef(null);
    const visFunction = useRef(null);


    /*
     * Alustetaan d3 komponentti
     */ 
    function initVis() {

        visFunction.current = d3BarChact()
            .actData(acData)
            .compData(cgData)
            .height(height)
            .width(width)
            .maxNumbOfStars(maxNumbOfStars)

        select(refElement.current)
            .call(visFunction.current)  
            
    };

    const updateDonut = () => {

        visFunction.current
            .compData(cgData);
        
    };

    useEffect(() => {   

        
        if(acData && acData.length && cgData && cgData.length){

            if(visFunction.current === null)
                initVis()
            else
                updateDonut()

        }

        return () => {
            console.log('useEffect data cleanup')
        }
    

    }, [acData, cgData]);


    /*
     *
     */
    return (
        <div ref={refElement}></div>
    )
};

export default BarChart;