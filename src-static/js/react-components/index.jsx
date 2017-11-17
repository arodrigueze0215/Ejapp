import React from 'react';
import {render} from 'react-dom';
import InscriptionsList from './pages/inscriptions-list/InscriptionsList.jsx';
var target = document.getElementById('react-target-inscriptionslist');

let Main = (props) =>{
    return(
        <div className="Main">
            <InscriptionsList id="inscriptionList"/>
        </div>

    );
}
 
if (target!==null) {
    render(
        <Main/>,
        target,
    );    
}
