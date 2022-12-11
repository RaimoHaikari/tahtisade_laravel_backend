import { Rect } from "./histogramElements";

export const Bins = ({bins, insetLeft, insetRight, xScale, Y, yScale}) => {
    return (
        <g>
            {
                bins.map((d,i) => {
                    return (
                        <Rect 
                            key={`hist-bin-${i}`}
                            x = {xScale(d.x0) + insetLeft}
                            width = { Math.max(0, xScale(d.x1) - xScale(d.x0) - insetLeft - insetRight) }
                            y = { yScale(Y[i])}
                            height = {yScale(0) - yScale(Y[i])}
                        />
                    )
                })
            }
        </g>
    )
};