import React from 'react';
import {render} from 'react-dom';
import InscriptionsList from './pages/inscriptions-list/InscriptionsList.jsx';

let Main = (props) =>{
    return(
        <div className="Main">
            <InscriptionsList id="inscriptionList"/>
        </div>

    );
}
 
render(
    <Main/>,
    document.getElementById('react-target-inscriptionslist'),
);
