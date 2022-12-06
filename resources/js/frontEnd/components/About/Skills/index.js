import JavaScript from "../../Logos/JavaScript";
import Php from "../../Logos/Php";
import Laravel from "../../Logos/Laravel";
import ReactLogo from "../../Logos/ReactLogo";
import Redux from "../../Logos/Redux";
import D3 from "../../Logos/D3";
import GraphQL from "../../Logos/GraphQL";
import MariaDB from "../../Logos/MariaDB";
import LightHouse from "../../Logos/LightHouse";

import { Container } from "./skillsElements";

const Skills = () => {
    return (
        <Container>

            <div className="grid-item">
                <JavaScript />
            </div>
            <div className="grid-item">
                <Php />
            </div>
            <div className="grid-item">
                <Laravel />
            </div>  
            <div className="grid-item">
                <ReactLogo />
            </div>
            <div className="grid-item">
                <Redux />
            </div>
            <div className="grid-item">
                <D3 />
            </div>
            <div className="grid-item">
                <GraphQL />
            </div>  
            <div className="grid-item">
                <MariaDB />
            </div>
            <div className="grid-item">
                <LightHouse />
            </div>

        </Container>
    );
};

export default Skills;