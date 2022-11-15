import Jambo from "../../components/Logos/Jambo";
import Kansi from "../../../images/tahtisade-kansi-leikattu.png";

const LandingPage = () => {

    return (

        <section className="hero padding-block-900">
            <div className="container">
                <div className="even-columns">

                    <div className="flow">
                        <h1 className="fs-primary-heading fw-bold">Tähtisadetta</h1>
                        <p className="fw-bold">Katsaus elokuvien ensi-ilta-arvosteluihin</p>
                    </div>

                    <div>
                        <img src={Kansi} alt="Kriitikko työnsä äärellä"/>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default LandingPage;