export const LabelBottom = ({marginLeft, title, width}) => {
    return (
        <g>
            <text
                transform={`translate(${marginLeft/2},${width/2}) rotate(270)`}
                dy="-.45em"
            >{title}</text>
        </g>
    )
}