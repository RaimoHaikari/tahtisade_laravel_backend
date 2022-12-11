import { ticks } from "d3";
import {
    Line, Text
} from "./histogramElements";

export const AxisLeft = ({marginLeft, yScale, width}) => {


    return (
        <g>
        {
            yScale.ticks().map((tickValue, index) => {


                return(
                    <g
                        transform={`translate(${marginLeft}, ${yScale(tickValue)})`}
                        key = {`histogram-leftAxis-tick-${index}`}
                    >
                        <Line 
                            x2 = {width - marginLeft}
                            strokeOpacity = "0.5"
                            className={index !== 0 ? "dotted" : null}
                        />
                        <Text 
                            dy="-.3em"
                            dx="-.3em"
                            textAnchor="end"
                        >
                            {tickValue}
                        </Text>
                    </g>
                )
            })
        }
        </g>
    )
}