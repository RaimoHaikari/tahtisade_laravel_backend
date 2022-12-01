export const AxisBottom = ({ innerHeight, xScale }) => xScale.ticks().map(tickValue => {

    return (
        <g 
            key={tickValue}
            transform={`translate(${xScale(tickValue)},0)`}
            className="tick"
        >
            <line
                x1={0}
                y1={innerHeight}
                x2={0}
                y2={0}
                className = {Number.isInteger(tickValue) ? "even" : ""} 
            />
            <text
                dy="1em"
                y={innerHeight}
                style={{ textAnchor: "middle" }}
                className={(Number.isInteger(tickValue-0.5)?"":"visually-hidden")}
            >{tickValue-0.5}</text>
        </g>
    )
});