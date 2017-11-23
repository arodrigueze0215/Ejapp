import React from 'react';
import InscriptionsList from './InscriptionsList.jsx';
import {render} from 'react-dom';
import Nav from '../../nav/Nav.jsx';
var target = document.getElementById('react-target-inscriptionslist');

let Main = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="Main">
                <InscriptionsList id="inscriptionList" classSection="Section__inscriptionsList"/>
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
