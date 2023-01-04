import React from 'react';
import spinner from './Spinner.gif'

const Spinner = () => {
    return (
        <div>
            <img src={spinner} alt='Loading...' style={{width: '50px', display: 'block', margin:'auto'}}/>
        </div>
    )
}

export default Spinner
