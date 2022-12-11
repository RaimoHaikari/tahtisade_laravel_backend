import {useState, useEffect} from 'react';
import { csv } from 'd3'

export const useUnemploymentX = (csvUrl) => {

    const [data, setData] = useState(null);

    useEffect(() => {

        const row = d => {
            //console.log(d)
            //d.Population = parseFloat(d['2020']) * 1000;
            return d;
        }

        csv(csvUrl, row).then(data => {
            setData(data);
        })
    }, []);

    return {
        data
    }
};