export const AxisLeft = ({ yScale, innerWidth }) => yScale.ticks().map(tickValue => {

    return (
        <g
            key={tickValue}
            transform={`translate(0, ${yScale(tickValue)})`}
            className= "tick"
        >
            <text
                x={0}
                dx="-0.5em"
                className={(Number.isInteger(tickValue-0.5)?"":"visually-hidden")}
            >{tickValue-0.5}</text>
            <line
                x1={0}
                y1={0}
                x2={innerWidth}
                y2={0}
                className = {Number.isInteger(tickValue) ? "even" : ""} 
            />
        </g>
    )

});