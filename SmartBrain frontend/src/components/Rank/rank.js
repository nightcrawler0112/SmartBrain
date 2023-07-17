import React from 'react';


const Rank=({name,entries}) => {
   
    return(
        <div>
            <div className='white f3'>
                {`${name}, your current image count is `}

            </div>
            <div className='white f1'>
                {Math.round(entries/2)}
            </div>
        </div>
    );

}

export default Rank;