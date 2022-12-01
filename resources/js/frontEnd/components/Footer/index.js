import { Link } from "react-router-dom";

import GitHub from "../Logos/Github";
// import TextLogo from "../Logos/TextLogo";
import { TextLogo } from "../Logos/StarsLogo/textLogo";

/* 
padding-block-700 bg-neutral-900 text-neutral-100
*/
const Footer = () => {
    return (
        <footer className="primary-footer padding-block-700 bg-neutral-900">
            <div className="container">
                <div className="primary-footer-wrapper text-neutral-100">

                    <div  className="primary-footer-logo-social">

                        <Link to="/" aria-label="home">
                            <TextLogo />
                        </Link>

                        <ul className="social-list" role="list" aria-label="social links">
                            <li>
                                <a href="https://github.com/RaimoHaikari/tahtisadetta" target="_blank"><GitHub /></a>
                            </li>
                        </ul>
                    
                    </div>

                    <div className="primary-footer-nav">
                        <nav className="footer-nav">
                            <ul className="flow" aria-label="Footer" role="list">
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="primary-footer-websiteRights">
                        Raimo Haikari © {new Date().getFullYear()}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;