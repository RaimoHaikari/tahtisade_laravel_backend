import { useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import ReactGA from "react-ga";

import About from "./pages/About";
import Critic from "./pages/Critic";
import Critics from "./pages/Critics";
import Genre from "./pages/Genre";
import Genres from "./pages/Genres";
import LandingPage from "./pages/LandingPage";
//import Login from "./pages/Login";
//import Logout from "./pages/Logout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Recommendations from "./pages/Recommendations";


import Header from "./components/Header";
import Footer from "./components/Footer";

ReactGA.initialize('UA-78238364-1');

const App = () => {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        //console.log("." , window.location.pathname + window.location.search)
    });



    ///console.log(".." , window.location.pathname + window.location.search);

    return (
        <Router>

            <Header />

            <Routes>
                <Route path="/genret/:id" element={<Genre />} />
                <Route path="/genret" element={<Genres />} />
                <Route path="/kriitikot/:id" element={<Critic />} />
                <Route path="/kriitikot" element={<Critics />} />
                <Route path="/elokuvat/:id" element={<Movie />} />
                <Route path="/elokuvat" element={<Movies />} />
                <Route path="/suositukset" element={<Recommendations />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<LandingPage />} />
            </Routes>

            <Footer />
        
        </Router>
    );
};

export default App;