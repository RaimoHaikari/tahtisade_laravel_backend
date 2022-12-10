export const AxisLeft = ({marginLeft, yScale, width}) => {
    return (
        <g>
        {
            yScale.ticks().map((tickValue, index) => {

                return(
                    <g
                        className="tick"
                        transform={`translate(${marginLeft}, ${yScale(tickValue)})`}
                        key = {`histogram-leftAxis-tick-${index}`}
                    >
                        <line 
                            x2 = {width - marginLeft}
                            strokeOpacity = "0.2"
                        />
                        <text 
                            dy="-.3em"
                            dx="-.3em"
                            textAnchor="end"
                        >
                            {tickValue}
                        </text>
                    </g>
                )
            })
        }
        </g>
    )
}