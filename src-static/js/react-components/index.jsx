import React from 'react';
import {render} from 'react-dom';
import InscriptionsList from './pages/inscriptions-list/InscriptionsList.jsx';
import Nav from './pages/nav/Nav.jsx';
var target = document.getElementById('react-target-inscriptionslist');

let Main = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="Main">
                <InscriptionsList id="inscriptionList"/>
            </div>
        </div>

    );
}
 
if (target!==null) {
    render(
        <Main/>,
        target,
    );    
}
