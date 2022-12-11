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

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Bins } from "./bins";
import { LabelLeft } from "./LabelLeft";
import { LabelBottom } from "./LabelBottom";

import { Svg } from "./histogramElements";


const width = 640;
const height = 400;

const marginBottom = 50;
const marginLeft = 60;
const marginTop = 30;
const marginRight = 30;

const xRange = [marginLeft, width - marginRight];       // - histogrammin piirtoalue
const yRange = [height - marginBottom, marginTop];

const insetLeft = 0.5;
const insetRight = 0.5; // inset right edge of bar

const Histogram = ({leftAxisTitle, data, bottomAxisTitle}) => {

    const histStyle = {
        outline: '1px solid blue',
        maxWidth: '100%',
        height: 'auto',
        height: 'intrinsic'
    }

    let xDomain;
    let yDomain;

    const y = () => 1;              // given d in data, returns the (quantitative) weight

    // Compute values.
    const Y0 = d3Map(data, y);

    // Compute bins.
    const nOfBins = max(data)-min(data)+1;

    const bins = bin()
        .thresholds(nOfBins)(data);                   // - jaetaan aineisto koreihin
    const Y = Array.from(bins, I => sum(I, i => Y0[i]));    // - montako tapausta kukin kori sisältää

    // Compute default domains.
    if (xDomain === undefined) 
        xDomain = [min(data), max(data)];       // - millä välillä x-akselin arvot ovat

    if (yDomain === undefined)                              // - millä välillä y-akselin arvot ovat
        yDomain = [0, max(Y)];

    // Construct scales and axes.
    const xScale = scaleLinear(xDomain, xRange);            // - kuinka aineisto skaalataan piirtoalueelle
    const yScale = scaleLinear(yDomain, yRange);

    const yFormat = yScale.tickFormat(100, yFormat);
    const yAxis = axisLeft(yScale);

    /* width={width} height={height} viewBox={`0 0 ${width} ${height}` */
    return (
        <Svg width={width} viewBox={`0 0 ${width} ${height}`}>

            <LabelLeft 
                marginLeft={marginLeft}
                title={leftAxisTitle}
                width={width}
            />

            <LabelBottom 
                height = {height}
                title = {bottomAxisTitle}
                width = {width}
            />

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

        </Svg>
    );
};

export default Histogram;