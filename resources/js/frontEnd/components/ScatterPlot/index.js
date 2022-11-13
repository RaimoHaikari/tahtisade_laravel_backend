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
    bottom: 20,
    left: 20
};

const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const cutoffDisplayText = 10;

/*
 * https://bl.ocks.org/d3noob/a30f746eddb9f150bfd9872982f52a4a
 * https://observablehq.com/@d3/d3-bin
 * https://bl.ocks.org/larsenmtl/b00fcedde4d3d37098509f514a354bac
 */
const ScatterPlot = ({data, binCount}) => {

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
viewBox="0 0 189.9393 153.60861"
            width={width + margin.left + margin.right} 
            height={height + margin.top + margin.bottom}
    */
    return (
        <svg 
            className="scatterplot" 
            viewBox={`0 0 ${width+margin.left+margin.right} ${height+margin.top+margin.bottom}`}
        >
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom 
                    xScale={x}
                    innerHeight={height}
                />
            </g>
            
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisLeft 
                    yScale={y}
                    innerWidth = {width}
                />
            </g>

            <g transform={`translate(${margin.left + width},${margin.top})`}>
                <HistogramRight
                    bins = {yBins}
                    cutoffDisplayText = {cutoffDisplayText}
                    rHistWidth = {rHWidth}
                    y = {y}
                    yx = {yx}
                />
            </g>

            <g transform={`translate(${margin.left},${0})`}>
                <HistogramTop 
                    bins={xBins}
                    cutoffDisplayText={cutoffDisplayText}
                    margin={margin}
                    tHistWidth={tHWidth}
                    x={x}
                    xy={xy}
                />
            </g>

            <g transform={`translate(${margin.left},${margin.top})`}>
                <Dots 
                    data = {data}
                    radius = {radius}
                    y = { y }
                    x = { x }
                />          
            </g>

        </svg>
    );
};

export default ScatterPlot;

