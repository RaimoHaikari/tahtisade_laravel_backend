import { useSelector } from "react-redux";

import Histogram from "./Histogram";

const GraphicalOverview = () => {

    const { numbOfRevs } = useSelector(state => {

        const {allTheMovies} = state.movieList;

        const numbOfRevs = allTheMovies.map(movie => movie.numberOfReviews);
  
        return {
            numbOfRevs:  numbOfRevs
        }

    });

    if(!numbOfRevs){
        return <pre>Loading...</pre>
    }


    return (
        <div>
            <Histogram 
                leftAxisTitle = "Elokuvien lukumäärä"
                data = {numbOfRevs}
                bottomAxisTitle = "Arvostelujen lukumäärä"
            />
        </div>
    );
};

export default GraphicalOverview;