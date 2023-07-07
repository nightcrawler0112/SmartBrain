import React from 'react';
import './ImageLinkForm.css'

const ImageFinkForm=() => {
   
    return(
        <div>
            <p className='f3'>This SmartBrain detects the faces in your pictures . Give it a Try</p>
            <div className='center'>
                <div className='searchbox center pa4 br3 shadow-5'>
                    <input className='f4 pa2 center w-80'type='text'/>
                    <button className='w-20 grow f4 link ph3 pv2 center bg-light-blue'>Detect</button>
                </div>
            </div>
        </div>
    );

}

export default ImageFinkForm;