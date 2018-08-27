import React from 'react';
import {render} from 'react-dom';
import FormUpdateInscription from './containers/FormUpdateInscription.jsx';
const target = document.getElementById('reactTargetUpdateInscription');

const UpdateInscription = (props) =>{
    return(
        <div className="Main">
                <FormUpdateInscription/>   
        </div>
    );
}
 
if (target!==null) {
    render(
       <UpdateInscription/>,
        target
    );    
}
