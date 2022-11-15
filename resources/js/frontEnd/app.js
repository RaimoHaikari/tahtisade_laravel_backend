//import { useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Critics from "./pages/Critics";
import Genres from "./pages/Genres";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {

    /*
    useEffect(() => {
        window.process = {
          ...window.process,
        };
    }, []);

    const { MIX_TILULILU } = process.env;

    console.log("T:", MIX_TILULILU);
    */

    return (
        <Router>

            <Header />

            <Routes>
                <Route path="/genret" element={<Genres />} />
                <Route path="/kriitikot" element={<Critics />} />
                <Route path="/elokuvat/:id" element={<Movie />} />
                <Route path="/elokuvat" element={<Movies />} />
                <Route path="/suositukset" element={<Recommendations />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>

            <Footer />
        
        </Router>
    );
};

export default App;