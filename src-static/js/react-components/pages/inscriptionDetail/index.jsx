import React from 'react';
import InscriptionDetail from './InscriptionDetail.jsx';
import {render} from 'react-dom';
import Nav from '../../nav/Nav.jsx';
const target = document.getElementById('reactTargetInscriptionDetail');


 
if (target!==null) {
    render(
       <InscriptionDetail/>,
        target,
    );    
}
