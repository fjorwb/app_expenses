import React, { useEffect } from 'react'
import styled,{keyframes} from 'styled-components'
import theme from '../theme'

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;
 
const AlertsContainer = styled.div`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
 
        background: ${(props) => {
            if(props.type === 'error'){
                return theme.red;
            } else if (props.type === 'success') {
                return theme.green;
            } else {
                return '#000';
            }
        }};
        color: #fff;
        font-size: 1.75rem;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;

const Alert = ({type, msg, alertState, setAlertState}) => {
    useEffect(() => {
        let time
        if(alertState === true ){
            time = setTimeout(() => {
                setAlertState(false)
            },4000)
        }
        return (() => clearTimeout(time))
    },[alertState, setAlertState])
    
    return (
        <>
            {alertState &&
                <AlertsContainer type={type}>
                    <p>{msg}</p>
                </AlertsContainer>
            }
        </>
    )
}

export default Alert