import React from 'react';
import ResultsTemplate from '../ResultsTemplate.jsx';
import {render} from 'react-dom';
const target = document.getElementById('reactTargetResultTemplate');

let ResultInscriptionTemplate = (props) =>{
    const searchParams = new URLSearchParams(window.location.search);
    return(        
        <div className="Main">
            <ResultsTemplate {...props}>
                    <strong>{props.name}</strong>
                    te has inscrito para el 
                    <strong>FDS#{props.fds}</strong>
                    pronto nos comunicaremos contigo para darte todas las instrucciones
            </ResultsTemplate>
        </div>
    );
}
 
export default ResultInscriptionTemplate;