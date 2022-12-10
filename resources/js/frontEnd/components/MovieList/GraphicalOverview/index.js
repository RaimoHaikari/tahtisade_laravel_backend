/* 
file:///C:/Users/raimo/Documents/GitHub/tahtisadetta/R/reviews-summary.html

https://observablehq.com/@d3/histogram
*/

import { useSelector } from "react-redux";

import {
    axisLeft,
    bin,
    map as d3Map,
    max,
    min,
    range,
    scaleLinear,
    sum
} from "d3";

import { AxisBottom } from "./Histogram/AxisBottom";
import { AxisLeft } from "./Histogram/AxisLeft";
import { Bins } from "./Histogram/bins";
import { LabelBottom } from "./Histogram/LabelBottom";
import { LabelRight } from "./Histogram/LabelRight";


const width = 640;
const height = 400;

const marginBottom = 60;
const marginLeft = 60;
const marginTop = 60;
const marginRight = 30;

const xRange = [marginLeft, width - marginRight];       // - histogrammin piirtoalue
const yRange = [height - marginBottom, marginTop];

const insetLeft = 0.5;
const insetRight = 0.5; // inset right edge of bar

const GraphicalOverview = () => {
    
    const bottomAxisTitle = "Elokuvien lukumäärä";
    const sideAxisTitle = "Arvostelujen lukumäärä"

    const histStyle = {
        outline: '1px solid blue',
        maxWidth: '100%',
        height: 'auto',
        height: 'intrinsic'
    }

    const { numbOfRevs } = useSelector(state => {

        const {allTheMovies} = state.movieList;

        const numbOfRevs = allTheMovies.map(movie => movie.numberOfReviews);
  
        return {
            numbOfRevs:  numbOfRevs
        }

    });

    //const { data } = useUnemploymentX(csvUrl);

    if(!numbOfRevs){
        return <pre>Loading...</pre>
    }

    let xDomain;
    let yDomain;

    const y = () => 1;              // given d in data, returns the (quantitative) weight

    // Compute values.
    const Y0 = d3Map(numbOfRevs, y);

    // Compute bins.
    const nOfBins = max(numbOfRevs)-min(numbOfRevs)+1;

    const bins = bin()
        .thresholds(nOfBins)(numbOfRevs);                   // - jaetaan aineisto koreihin
    const Y = Array.from(bins, I => sum(I, i => Y0[i]));    // - montako tapausta kukin kori sisältää

    // Compute default domains.
    if (xDomain === undefined) 
        xDomain = [min(numbOfRevs), max(numbOfRevs)];       // - millä välillä x-akselin arvot ovat

    if (yDomain === undefined)                              // - millä välillä y-akselin arvot ovat
        yDomain = [0, max(Y)];

    // Construct scales and axes.
    const xScale = scaleLinear(xDomain, xRange);            // - kuinka aineisto skaalataan piirtoalueelle
    const yScale = scaleLinear(yDomain, yRange);

    const yFormat = yScale.tickFormat(100, yFormat);
    const yAxis = axisLeft(yScale);

    return (
        <svg style={histStyle} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>

            <LabelBottom 
                marginLeft={marginLeft}
                title={bottomAxisTitle}
                width={width}
            />

            <LabelRight 
                height = {height}
                marginBottom = {marginBottom}
                marginTop = {marginTop}
                title = {sideAxisTitle}
                width = {width}
            />

            <g transform={`translate(${width/2}, ${height - marginTop + (marginBottom/2)})`}>
                <text
                    dy=".6em"
                    textAnchor="middle"
                >Arvostelujen lukumäärä</text>
            </g>

            <AxisBottom
                bins = {bins}
                height = {height}
                marginBottom = {marginBottom}
                nOfBins = {nOfBins}
                xScale = {xScale} 
                Y = {Y}
                yScale = {yScale}
            />

            <AxisLeft 
                marginLeft = {marginLeft}
                yScale = {yScale}
                width = {width}
            />

            <Bins
                bins = {bins}
                insetLeft = {insetLeft}
                insetRight = {insetRight}
                xScale = {xScale}
                Y = {Y} 
                yScale = {yScale}
            />

        </svg>
    );
};

/*

            <g>
            {
                bins.map((d,i) => {

                    return(
                        <rect 
                            x = {xScale(d.x0) + insetLeft}
                            width = { Math.max(0, xScale(d.x1) - xScale(d.x0) - insetLeft - insetRight) }
                            y = { yScale(Y[i])}
                            height = {yScale(0) - yScale(Y[i])}
                        />
                    )
                })
            }
            </g>
*/

export default GraphicalOverview;