import { useState } from 'react';

import {
    CONTAINER,
    BUTTON,
    WRAPPER,
    CloseIcon,
    OpenIcon
} from './togglableElements';

const Togglable = (props) => {

    const [visible, setVisible] = useState(props.openAtStart?true:false);

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <CONTAINER>
            <BUTTON onClick={toggleVisibility}>
                {props.buttonLabel}
                <CloseIcon className={visible?"":"hideIcon"}/>
                <OpenIcon className={visible?"hideIcon":""} />
            </BUTTON>
            <WRAPPER className={visible?"":"hideContent"}>
                {props.children}
            </WRAPPER>
        </CONTAINER>
    );
};

export default Togglable;