import { useSelector } from "react-redux";

import {
    BsFillStarFill,
    BsStarHalf
} from 'react-icons/bs';

import {
    WRAPPER,
    KONTTI,
    BANNER,
    PROFILEIMAGE,
    H1,
    P
} from './cardElements';

const Card = () => {

    const { visibleData } = useSelector(state => state.movieList);

    /*
     *
     */
    const drawCard = (movie, index) => {

        const {ensiIlta, googleID, img, nimi, averageOfReviews} = movie;
    
        const eiDate = new Date(ensiIlta);
        const strEI = `${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`

        /*


        */
        return (
            <KONTTI 
                key={`${googleID}-${index}`}
                to={`/elokuvat/${googleID}`}
                className="KuvaKontti"
            >
                <BANNER />
                <PROFILEIMAGE 
                    src={img}
                />
                <H1>{nimi}</H1>
                <P><span>Ensi-ilta</span>{strEI}</P>
                <P>{visualizeStars(averageOfReviews, googleID)}</P>
            </KONTTI>
        )
    }

    /*
     *
     */
    const visualizeStars = (avg, id) => {

        let val = [];

        for(let i = 0; i < Math.floor(avg); i ++)
            val.push(<BsFillStarFill key={`${id}-BsFillStarFill-${i}`} />);

        if(avg % 1 >= 0.5)
            val.push(<BsStarHalf key={`${id}-BsStarHalf`}/>);

        return val;
    }

    return (
        <WRAPPER className="kuvakeRapperi">
        
        {
            visibleData
            ? visibleData.map((movie, index) => drawCard(movie, index))
            : null
        }
        
        </WRAPPER>
    );
};

export default Card;