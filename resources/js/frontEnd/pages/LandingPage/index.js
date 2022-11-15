//import Jambo from "../../components/Logos/Jambo";
//import Kansi from "../../../../images/tahtisade-kansi-leikattu.png";

/*
<img src="/images/slider-girl.png" />
*/
const LandingPage = () => {

    return (

        <section className="hero padding-block-900">
            <div className="container">
                <div className="even-columns">

                    <div className="flow">
                        <h1 className="fs-primary-heading fw-bold">Tähtisadetta</h1>
                        <p className="fw-bold">Katsaus elokuvien ensi-ilta-arvosteluihin</p>
                        <img src="./images/tahtisade-kansi-leikattu.png" alt="Kriitikko työnsä äärellä"/>
                        <img src="/images/tahtisade-kansi-leikattu.png" alt="Kriitikko työnsä äärellä"/>
                        <img src="public/images/tahtisade-kansi-leikattu.png" alt="Kriitikko työnsä äärellä"/>
                    </div>

                    <div>
                        <img src="./public/images/tahtisade-kansi-leikattu.png" alt="Kriitikko työnsä äärellä"/>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default LandingPage;