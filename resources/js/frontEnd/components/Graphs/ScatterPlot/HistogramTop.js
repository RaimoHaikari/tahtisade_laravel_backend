export const HistogramTop = ({bins, cutoffDisplayText, margin,  tHistWidth, x, xy}) => bins.map((B,i) => {

    return (
        <g
            key={`hsTop-${i}`}
            transform={`translate(${x(B.x0)},${xy(B.length)})`}
        >
            <rect 
                x={1}
                width={tHistWidth}
                height={margin.top - xy(B.length)}
                style={{ fill: "var(--clr-primary-400)" }}
            />
            <text
                dy="1em"
                y = {2}
                x = { tHistWidth / 2}
            >
                {
                    B.length < cutoffDisplayText ? "" : B.length
                }
            </text>
        </g>
    )
});