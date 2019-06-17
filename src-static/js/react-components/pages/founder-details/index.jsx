import React from 'react';
import InscriptionDetail from './InscriptionDetail.jsx';
import {render} from 'react-dom';
import Nav from '../../Commons/nav/Nav.jsx';
const target = document.getElementById('reactTargetFounderDetail');

let MainDetail = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="content">
              detalles de encontrado
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
