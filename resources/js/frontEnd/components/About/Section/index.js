import {Container} from "./sectionElements";

const Section = (props) => {

    const {title, text} = props;

    return (
        <Container>
            <h4 className="section-title">{title}</h4>
            {
                text !== null
                ? <p className="margin-top">{text}</p>
                : null
            }
            {
                typeof props.children !== "undefined"
                ? props.children
                : null
            }
        </Container>
    );
};

export default Section;