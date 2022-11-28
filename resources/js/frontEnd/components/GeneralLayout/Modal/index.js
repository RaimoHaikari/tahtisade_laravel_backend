import { useEffect, useState } from 'react';

import {
    ModalWrapper
} from "./modalElements";

/*
 * {props.children}
 */
const Modal = (props) => {

    

    const [visible, setVisible] = useState(props.openAtStart?true:false);

    useEffect(() => {
        setVisible(props.openAtStart)
    }, [props.openAtStart])

    return (
        <ModalWrapper
            isOpen = {visible}
        >
            <div className='modal-content-BG'>
                {props.children}
            </div>
            
        </ModalWrapper>
    );
};

export default Modal;