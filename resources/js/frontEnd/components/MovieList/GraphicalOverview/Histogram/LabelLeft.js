import { Text } from "./histogramElements";

export const LabelLeft = ({marginLeft, title, width}) => {
    return (
        <g>
            <Text
                transform={`translate(${marginLeft/2},${width/2}) rotate(270)`}
                dy="-.45em"
            >{title}</Text>
        </g>
    )
}