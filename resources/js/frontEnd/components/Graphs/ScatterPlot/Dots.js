export const Dots = ({data, radius, y, x}) => data.map((d,i) => {

    /*
     * Huom! Arvoon lisätään puolikas, jotta pallero piirtyy oikealle kohdalle
     *       graafia suhteessa koordinaatistoon ja histogrammeihin
     */
    return (
        <circle 
            cx = {x(d[0]+0.5)}
            cy = {y(d[1]+0.5)}
            r = { radius }
            key = {`sp-dot-${i}`}
        />
    )
});
