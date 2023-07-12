import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.jpeg'
import './Logo.css';

const Logo=() => {
   
    return(
        
        <div className='ma4 br3 pa4 mt0'>
            <Tilt className="Tilt br2 shadow-2">
            <div>
                <img alt='1' src={brain}/>
            </div>
            </Tilt>

        </div>
        
    );

}

export default Logo;

