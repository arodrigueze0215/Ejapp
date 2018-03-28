import React from 'react';
import InscriptionDetail from './InscriptionDetail.jsx';
import {render} from 'react-dom';
import Nav from '../../Commons/nav/Nav.jsx';
const target = document.getElementById('reactTargetInscriptionDetail');

let MainDetail = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="content">
                <InscriptionDetail classSection="content__inscriptionDetail"/>   
            </div>
        </div>

    );
}
 
if (target!==null) {
    render(
       <MainDetail/>,
        target
    );    
}
