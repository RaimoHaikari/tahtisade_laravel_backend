import {
    Container,
    FormGroup,
    RadioColName,
    SettingsLabel,
    RadioColValue,
    RadioWrapper,
    RadioInput,
    RadioLabel
} from "./radiogroupElements";

const RadioGroup = (props) => {
    return (
        <Container name="Container">
            <FormGroup name="FormGroup">

                <RadioColName name="FormColName">
                    <SettingsLabel>{props.title}</SettingsLabel>
                </RadioColName>

                <RadioColValue className="RadioColValue">
                    
                    {
                        Object.values(props.options).map(o => {
                            return (
                                <RadioWrapper key={o.value}>
                                    <RadioInput 
                                        value={o.value}
                                        type="radio"
                                        name={o.value}
                                        id={o.value}
                                        checked={o.isActive}
                                        onChange={(e) => props.changeHandler(e.target.value)}
                                    />

                                    <RadioLabel className = "RadioLabel"
                                        htmlFor={o.value}
                                    >{o.name}</RadioLabel>
                                </RadioWrapper>
                            )
                        })
                    }

                </RadioColValue>
            </FormGroup>
        </Container>
    );
};

export default RadioGroup;