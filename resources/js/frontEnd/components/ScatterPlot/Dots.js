export const Dots = ({data, radius, y, x}) => data.map((d,i) => {

    return (
        <circle 
            cx = {x(d[0])}
            cy = {y(d[1])}
            r = { radius }
            key = {`sp-dot-${i}`}
        />
    )
});
