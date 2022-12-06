import DashBoard from "../../components/About/Dashboard";
import Section from "../../components/About/Section";
import Skills from "../../components/About/Skills";


const About = () => {
    return (
        <section className="hero padding-block-700">

            <div className="container">

                <div className="even-columns">

                    <div>

                        <Section 
                            title="Mitä ihmettä"
                            text="Kerään elokuvien saamia ensi-ilta-arvioita ja tänne valmistuu niitä listaava sivusto. Työ on vielä kesken, joten esim. sivuston ulkoasussa ja käyttökokemuksessa on vielä paljon parantamisen varaa."
                        />

                        <Section
                            title = "Yhteenveto"
                            text = {null} 
                        >
                            <DashBoard />
                        </Section>

                        <Section
                            title="Aineisto"
                            text={null}
                        >
                            <p className="margin-top">Aineisto, jota tällä sivulla käytetään löytyy myös <a href="https://github.com/RaimoHaikari/tahtisadetta" target="_blank">Github-tililtäni</a>. Linkin takaa löytyvä materiaali on kenen tahansa käytettävissä.</p>
                        </Section>
                    </div>

                    <div>

                        <Section 
                            title="Tavoite"
                            text="Harrastan ohjelmointia ja toiveena olisi joku päivä työllistyä alalle. Näin ollen sivusto toimii myös portfoliotyönä."
                        />

                        <Section
                            title = "Osaaminen"
                            text = "Sivustoa totetuttaessani olen käyttänyt mm. seuraavia tekniikoita."
                        >
                            <Skills />
                        </Section>

                    </div>

                </div>
            </div>








        </section>
    );
};

/*
                    <div className="grid-item"><JavaScript /></div>
                    <div className="grid-item"><Php /></div>
                    <div className="grid-item"><Laravel /></div>  
                    <div className="grid-item"><ReactLogo /></div>
                    <div className="grid-item"><Redux /></div>
                    <div className="grid-item"><D3 /></div>  
                    <div className="grid-item"><GraphQL /></div>
                    <div className="grid-item"><MariaDB /></div>
                    <div className="grid-item"><LightHouse /></div>  

*/

export default About;