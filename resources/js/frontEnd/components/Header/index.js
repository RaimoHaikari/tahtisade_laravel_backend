import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "../Logos/StarsLogo";


const Header = () => {

    /* Onko menu näkyvillä mobiilitilassa */
    const [primaryNavigationVisible, setPrimaryNavigationVisible] = useState(false);

    const logoClickHandler = () => {

        if(!primaryNavigationVisible)
            return;

        setPrimaryNavigationVisible(!primaryNavigationVisible);

    }

    const mobileNavToggleHandler = () => {
        setPrimaryNavigationVisible(!primaryNavigationVisible);
    }

    return (
        <header className="primary-header">
            <div className="container">

                <div className="nav-wrapper">

                    <Link onClick={logoClickHandler} to="/">
                        <Logo />
                    </Link>

                    <button 
                        className="mobile-nav-toggle"
                        aria-expanded={primaryNavigationVisible}
                        aria-controls="primary-navigation"
                        onClick={mobileNavToggleHandler}
                    >
                        <span className="visually-hidden">Menu</span>
                    </button>

                    <nav className="primary-navigation" data-visible={primaryNavigationVisible}>
                        <ul role="list" aria-label="Primary" className="nav-list" id="primary-navigation">
                            <li><Link onClick={mobileNavToggleHandler} to="/genret">Genret</Link></li>
                            <li><Link onClick={mobileNavToggleHandler} to="/kriitikot">Kriitikot</Link></li>
                            <li><Link onClick={mobileNavToggleHandler} to="/elokuvat">Elokuvat</Link></li>
                        </ul>
                    </nav>

                </div>
                
            </div>
        </header>
    );
};

export default Header;

/*
                            <li><Link onClick={mobileNavToggleHandler} to="/suositukset">Recommendations</Link></li>
*/