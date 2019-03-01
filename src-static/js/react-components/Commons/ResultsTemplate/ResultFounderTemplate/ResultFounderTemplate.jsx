import React from 'react';
import ResultsTemplate from '../ResultsTemplate.jsx';
const target = document.getElementById('reactTargetResultTemplate');

let ResultFounderTemplate = (props) =>{
    return(        
        <div className="Main">
            <ResultsTemplate {...props}>
            <div className="section__resultTemplate__content">
                <span className="section__resultTemplate__content__name">
                    <strong>{props.name}</strong>. Bienvenido a la plataforma.
                    Para el encuentro juevenil es muy gratificante que te unas a nosotros.
                </span>

                
                <button> <a href="../login/">Inicia sesión Aquí</a></button>            
            </div>
            </ResultsTemplate>

        </div>
    );
}
export default ResultFounderTemplate;