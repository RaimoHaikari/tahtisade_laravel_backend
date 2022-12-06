//import Jambo from "../../components/Logos/Jambo";
//import Kansi from "../../../../images/tahtisade-kansi-leikattu.png";
import PreviewCard from "../../components/LandingPage/PreviewCard";

const LandingPage = () => {

    return (

        <section className="hero padding-block-900">
            <div className="container">
                <div className="even-columns">

                    <div className="flow">
                        <svg id="landingPage-title" viewBox="0 0 130 20">
                            <text x="0" y="18">TÄHTISADETTA</text>
                        </svg>
                        <p className="fw-bold with-letter-spacing aling-center">Katsaus elokuvien ensi-ilta-arvosteluihin</p>
                    </div>

                    <div>
                        <img src="./images/tahtisade-kansi-leikattu.png" alt="Kriitikko työnsä äärellä"/>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default LandingPage;