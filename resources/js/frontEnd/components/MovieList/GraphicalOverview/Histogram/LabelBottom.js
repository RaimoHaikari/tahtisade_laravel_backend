import { Text } from "./histogramElements";

export const LabelBottom = ({ height, title, width }) => {

    return (
        <g transform={`translate(${width/2}, ${height})`}>
            <Text
                dy="-.6em"
                textAnchor="middle"
            >{title}</Text>
        </g>
    )

}