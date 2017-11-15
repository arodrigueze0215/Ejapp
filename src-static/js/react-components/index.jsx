import React from 'react';
import {render} from 'react-dom';
import InscriptionsList from './pages/inscriptions-list/InscriptionsList.jsx';


 
render(
    <InscriptionsList id="datatable"/>,
    document.getElementById('react-target-inscriptionslist'),
);
