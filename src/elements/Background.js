import React from 'react'
import styled from 'styled-components'

import {ReactComponent as Dots} from '../images/dots.svg'


const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: red;
    }
`;
const Svg1 = styled.svg`
    height: 55vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    opacity: 0.7;
    z-index: 1;
    path {
        fill: yellow;
    }
`;
 
const DotsUp = styled(Dots)`
    position: fixed;
    z-index: 1;
    top: 2.5rem;
    left: 2.5rem;
    opacity:0.5;
    `;
    
    const DotsDown = styled(Dots)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem;
    right: 2.5rem;
    opacity:0.5;
`;

const Background = () => {
    return (
        <>
            <DotsUp/>
            <Svg1 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
               <path  fillOpacity="1" d="M0,128L48,160C96,192,192,256,288,266.7C384,277,480,235,576,224C672,213,768,235,864,250.7C960,267,1056,277,1152,266.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </Svg1>

            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                <path fillOpacity="1" d="M0,64L40,58.7C80,53,160,43,240,48C320,53,400,75,480,96C560,117,640,139,720,144C800,149,880,139,960,154.7C1040,171,1120,213,1200,229.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
                </path>
            </Svg>

            <DotsDown/>
        </>
    )
}

export default Background