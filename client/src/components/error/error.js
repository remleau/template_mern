import React from 'react';
import './error.scss';

const Error = (props) =>{
    return(
        <div className="error">
            <p>
                {props.value}
            </p>
        </div>
    );
};

export default Error;
