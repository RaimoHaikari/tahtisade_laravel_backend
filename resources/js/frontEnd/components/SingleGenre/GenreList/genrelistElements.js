import styled from 'styled-components';

export const CONTAINER = styled.div`
    background-color: ${({theme}) => theme.color.clrNeutral100};; 
    padding: ${({theme}) => theme.size.size300};;

    display: flex;
    flex-direction: column;
`;

export const LABEL = styled.label`

    display: inline-flex;
    align-items: center;

    cursor: ${props => props.disabled ? "default" : "pointer"};
    font-size: ${({theme}) => theme.fontSize.fs600};

    /* margin-right: 10px; */
    margin-bottom: ${({theme}) => theme.size.size300};;

    color: ${props => props.disabled 
        ? props.theme.color.clrAccent500
        : "inherit"
    };

    & > div.radioRadio {
        width: ${({theme}) => theme.size.size400};
        height: ${({theme}) => theme.size.size400};
        border: ${(props, theme) => props.disabled ? "none": "2px solid #d8e4e2"};
        /* border: 2px solid #d8e4e2; */
        border-radius: 50%;
        margin-right: ${({theme}) => theme.size.size300};

        box-sizing: border-box;
        padding: ${({theme}) => theme.size.size100};;
    }

    & > div.radioRadio::after {
        content: "";
        width: 100%;
        height: 100%;
        display: block;

        outline-width: 1px;
        outline-style: solid;
        outline-color: ${({theme}) => theme.color.clrNeutral900};

        background-color:  ${({theme}) => theme.color.clrAccent400};  
        border-radius: 50%;  
        transform: scale(0);
        transition: transform 0.15s;
    }
`;

// next element....
export const INPUT = styled.input`
    display: none; 

    &:checked + div.radioRadio::after{
        transform: scale(1);
    }
`;