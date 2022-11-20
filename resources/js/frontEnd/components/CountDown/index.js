import { useEffect, useRef} from 'react';

import { select } from 'd3';

import { D3Countdown } from "./d3Countdown";

import './countdown.css';

const CountDown  = () => {

    const refElement = useRef(null);
    const visFunction = useRef(null);

    /*
    * d3 -komponentin alustus
    */
    const initVis = () => {

        visFunction.current = D3Countdown()
            .height(200)
            .width(300)
            .data([])

        select(refElement.current)
            .call(visFunction.current)
            
            
    }


    useEffect(() => {

        if(visFunction.current === null)
            initVis()

    }, [])

    return (
        <>
            <svg ref={refElement}>
                <defs>
                    <radialGradient id="myGradient">
                        <stop offset="0%" stopColor="#757575" />
                        <stop offset="60%" stopColor="#fff" />
                    </radialGradient>
                </defs>
            </svg>
        </>
    );
};

export default CountDown;