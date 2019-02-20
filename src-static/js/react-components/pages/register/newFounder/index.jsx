import React from 'react';
import {render} from 'react-dom';
import NewFounder from './Main.jsx'
const target = document.getElementById('targetNewFounder');

let FormFounder = () =>{
    return(
        <div className="Main">
                <NewFounder/>   
        </div>
    );
}
 
if (target!==null) {
    render(
       <FormFounder/>,
        target
    );    
}
