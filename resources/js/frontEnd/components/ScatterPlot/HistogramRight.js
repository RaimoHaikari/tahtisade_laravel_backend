export const HistogramRight = ({bins, cutoffDisplayText, rHistWidth, y, yx}) => bins.map((B,i) => {
    return(
        <g
            key = {`hsRight-${i}`}
            transform={`translate(${0},${y(B.x1)})`}
        >
            <rect 
                y = {1}
                width = {yx(B.length)}
                height = { rHistWidth }
            />
            <text
                dx = "-1em"
                y = {rHistWidth/2 + 1}
                x = {yx(B.length)}
            >
            {
                B.length < cutoffDisplayText ? "" : B.length
            }
            </text>
        </g>
    )
});

/*
 {
                yBins.map((yB,i) => {
                    return(
                        <g
                            key = {`yB-${i}`}
                            transform={`translate(${0},${y(yB.x1)})`}
                        >
                            <rect 
                                y = {1}
                                width = {yx(yB.length)}
                                height = { rHWidh }
                            />
                            <text
                                dx = "-1em"
                                y = {rHWidh/2 + 1}
                                x = {yx(yB.length)}
                            >
                            {
                                yB.length < cutoffDisplayText ? "" : yB.length
                            }
                            </text>
                        </g>
                    )
                })
            }
*/