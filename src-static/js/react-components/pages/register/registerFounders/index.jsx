import React from 'react';
import {render} from 'react-dom';
import RegisterEmptyFounder from './RegisterEmptyFounder.jsx'
const target = document.getElementById('reactTargetNewEmptyFounder');

let FormFounder = (props) =>{
    return(
        <div className="Main">
                <RegisterEmptyFounder/>   
        </div>
    );
}
 
if (target!==null) {
    render(
       <FormFounder/>,
        target
    );    
}
