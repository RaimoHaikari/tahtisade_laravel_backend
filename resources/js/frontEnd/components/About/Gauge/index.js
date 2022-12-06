import { 
    Container,
    Svg 
} from "./gaugeElements"

const Gauge = ({number, title}) => {
    return (
        <Container>
            <div className="percent">
                <Svg viewBox="0 0 140 140" preserveAspectRatio="xMinYMin meet">
                    <circle r="50" cx="50%" cy="50%" />
                    <circle r="50" cx="50%" cy="50%" />
                </Svg>
                
                <div className="number">
                    <h2>{number}</h2>
                </div>      
            </div>
            <h2 className="text">{title}</h2>
        </Container>
    );
};

/*
        <Container>
            <div className="card">
                <div className="_box">
                    <div className="_percent">
                        <Svg>
                            <circle cx="70" cy="70" r="70"></circle>
                            <circle cx="70" cy="70" r="70"></circle>
                        </Svg>

                        <div className="_number">
                            <h2>90<span>%</span></h2>
                        </div>

                    </div>
                    <h2 className="_text">{title}</h2>
                </div>
            </div>
        </Container>

*/

export default Gauge;