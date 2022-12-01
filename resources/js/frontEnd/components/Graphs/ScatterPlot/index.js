import { useState } from "react";

import {
    bin,
    max,
    range,
    scaleLinear
} from "d3";

import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { Dots } from "./Dots";
import { HistogramTop } from "./HistogramTop";
import { HistogramRight } from "./HistogramRight";



const margin = {
    top: 80,
    right: 80,
    bottomInner: 20,
    bottomOuter: 30,
    leftInner: 20,
    leftOuter: 30
};

const width = 500 - margin.leftInner - margin.leftOuter - margin.right;
const height = 500 - margin.top - margin.bottomInner - margin.bottomOuter;

const cutoffDisplayText = 10;

/*
 * https://bl.ocks.org/d3noob/a30f746eddb9f150bfd9872982f52a4a
 * https://observablehq.com/@d3/d3-bin
 * https://bl.ocks.org/larsenmtl/b00fcedde4d3d37098509f514a354bac
 */
const ScatterPlot = ({data, nameOfActive, nameOfComp, binCount}) => {

    console.log(".....");
    console.log(nameOfActive)
    console.log(".....");

    const [radius, setRadius] = useState(7);

    const x = scaleLinear()
        .range([0, width])
        .domain([0,binCount]);

    const y = scaleLinear()
        .range([height, 0])
        .domain([0,binCount]);

    const histogramXValues = bin()
        .domain(x.domain())
        .thresholds(x.ticks(binCount))
        .value(d => {
            return(d[0]);
        });

    const histogramYValues = bin()
        .domain(y.domain())
        .thresholds(y.ticks(binCount))
        .value(d => {
            return(d[1]);
        });

    const xBins = histogramXValues(data);
    const yBins = histogramYValues(data);

    const xy = scaleLinear()
        .domain([0, max(xBins, function(d){
            return d.length;
        })])
        .range([margin.top, 0]);

    const yx = scaleLinear()
       .domain([0, max(yBins, function(d){
            return d.length;
       })])
       .range([0, margin.right]);

    const tHWidth = x(xBins[0].x1) - x(xBins[0].x0) - 1;
    const rHWidth = y(yBins[0].x0) - y(yBins[0].x1) - 1; // Oikeanpuoleinen histogrammi

    /*
     *
     */
    return (
        <svg 
            className="scatterplot" 
            viewBox={`0 0 ${width+margin.leftInner+margin.leftOuter+margin.right} ${height+margin.top+margin.bottomInner+margin.bottomOuter}`}
        >

            <g transform={`translate(${margin.leftInner+margin.leftOuter},${margin.top})`}>
                <AxisBottom 
                    xScale={x}
                    innerHeight={height}
                />
            </g>
            
            <g transform={`translate(${margin.leftInner+margin.leftOuter},${margin.top})`}>
                <AxisLeft 
                    yScale={y}
                    innerWidth = {width}
                />
            </g>

            <g transform={`translate(${margin.leftInner+margin.leftOuter + width},${margin.top})`}>
                <HistogramRight
                    bins = {yBins}
                    cutoffDisplayText = {cutoffDisplayText}
                    rHistWidth = {rHWidth}
                    y = {y}
                    yx = {yx}
                />
            </g>

            <g transform={`translate(${margin.leftInner+margin.leftOuter},${0})`}>
                <HistogramTop 
                    bins={xBins}
                    cutoffDisplayText={cutoffDisplayText}
                    margin={margin}
                    tHistWidth={tHWidth}
                    x={x}
                    xy={xy}
                />
            </g>

            <g transform={`translate(${margin.leftInner+margin.leftOuter},${margin.top})`}>
                <Dots 
                    data = {data}
                    radius = {radius}
                    y = { y }
                    x = { x }
                />          
            </g>

            <g transform={`translate(${margin.leftInner+margin.leftOuter + (width/2)},${margin.top + height + margin.bottomInner +  (margin.bottomOuter/2)})`}>
                <text style={{ fontSize: "var(--fs-700)", letterSpacing: "var(--size-100)", fontWeight: "var(--fw-semi-bold)", fill: "var(--clr-primary-400)", textAnchor: "middle"}} x={0} y={0}>
                    {nameOfActive}
                </text>
            </g>

            <g transform={`translate(${margin.leftInner},${(margin.top + height/2)}) rotate(-90)`}>
                <text style={{ fontSize: "var(--fs-700)", letterSpacing: "var(--size-100)", fontWeight: "var(--fw-semi-bold)", fill: "var(--clr-accent-400)", textAnchor: "middle"}} x={0} y={0}>
                    {nameOfComp}
                </text>
            </g>

        </svg>
    );
};

export default ScatterPlot;

/*
                <rect style={{ fill: "yellow" }} width={margin.leftOuter} height={height} />
                <text transform={`translate(${-(width-margin.leftInner)},${height}) rotate(90) scale(-1,-1)`} style={{ fill: "red", textAnchor: "start"}} x={0} y={height }>
                    Small Cat Did This And That
                </text>

*/