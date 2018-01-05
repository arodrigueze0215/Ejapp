import React from 'react';
import InscriptionsList from './InscriptionsList.jsx';
import {render} from 'react-dom';
import Nav from '../../nav/Nav.jsx';
var target = document.getElementById('react-target-inscriptionslist');

let Main = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="content">
                <InscriptionsList id="inscriptionList" classSection="content__inscriptionsList"/>
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
