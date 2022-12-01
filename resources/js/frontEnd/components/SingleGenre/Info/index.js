import {
    Container
} from "./infoElements";

/*

*/
const Info = () => {
    return (
        <Container>
            <p>
                Pylväskuvion avulla voidaan vertailla aktiivista genreä edustavien elokuvien suosiota muihin genreihin verrattuna.
            </p>
            <p>
                Kriitikot pitivät enemmän sen lajityypin elokuvista, kummalla on korkemmat pylväät graafin oikeassa reunassa.
            </p>
            <ul>
                <li>Kapea pylväs edustaa aktiivisen genren tähtien määrää.</li>
                <li>Genreluokitukset on kerätty <a href="https://www.imdb.com/" target="_blank">IMDB:n</a> sivuilta.</li>
                <li>Sama elokuva edustaa yleensä useaa lajityyppiä.</li>
                <li>Vertailtavan lajityypin arvostelujen määrä on skaalattu vastaamaan aktiivisen genren arvosanojen määrää.</li>
            </ul>
        </Container>
    );
};

export default Info;