export const AxisBottom = ({bins, height, marginBottom, nOfBins, xScale, Y, yScale}) => {
    return (
        <g>
            {
                xScale.ticks(nOfBins).map((tickValue, index) => {

                    const ala = bins[index].x0;
                    const yla = bins[index].x1

                    const middle = xScale(ala) + (xScale(yla) - xScale(ala))/2;

                    return (
                        <g
                            key={`histogram-axisBottom-tick-${index}`}
                            className="tick"
                            transform={`translate(${middle}, ${height - marginBottom})`}
                        >
                            <text 
                                x = { 0 }
                                y = { -(height-marginBottom-yScale(Y[index]))  }
                                textAnchor="middle"
                                dy="-.3em"
                            >
                                {Y[index]}
                            </text>

                            <text 
                                x = { 0 }
                                y = { 15 }
                                textAnchor="middle"
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