import React from 'react';
import ResultsTemplate from '../ResultsTemplate.jsx';
import {render} from 'react-dom';
const target = document.getElementById('reactTargetResultTemplate');

let ResultFounderTemplate = (props) =>{
    return(        
        <div className="Main">
            <ResultsTemplate {...props}>
                <strong>{props.name}</strong>. Bienvenido a la plataforma.
                 Para el encuentro juevenil es muy gratificante que te unas a nosotros.
            </ResultsTemplate>
        </div>
    );
}
export default ResultFounderTemplate;