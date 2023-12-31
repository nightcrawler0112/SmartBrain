import React from 'react';
import './ImageLinkForm.css'

const ImageFinkForm=({onInputChange,onButtonDetect}) => {
   
    return(
        <div>
            <p className='f3'>This SmartBrain detects the faces in your pictures<br></br>Paste the link below!!</p>
            <div className='center'>
                <div className='searchbox center pa4 br3 shadow-5'>
                    {/* <label className="db fw6 lh-copy f6" for="name">Paste your link here!</label> */}
                    <input className='f4 pa2 center w-80'type='text' onChange={onInputChange}/>
                    
                    <button className='w-20 grow f4 link ph3 pv2 center bg-light-blue'
                      onClick={onButtonDetect}>Detect</button>
                </div>
            </div>
        </div>
    );

}

export default ImageFinkForm;