import Gauge from "../Gauge";

import { Container } from "./dashboardElements"

/*


*/
const DashBoard = () => {
    return (
        <Container className="margin-top">
            <Gauge title="Elokuvaa" number={175} />
            <Gauge title="Arvostelua" number={1030} />
            <Gauge title="Kriitikkoa"  number={96}/>
        </Container>
    );
};

export default DashBoard;