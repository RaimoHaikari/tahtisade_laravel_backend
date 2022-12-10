export const LabelRight = ({ height, marginBottom, marginTop, title, width }) => {

    return (
        <g transform={`translate(${width/2}, ${height - marginTop + (marginBottom/2)})`}>
            <text
                dy=".6em"
                textAnchor="middle"
            >{title}</text>
        </g>
    )

}