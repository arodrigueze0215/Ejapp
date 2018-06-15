import React from 'react';
import {render} from 'react-dom';
import ResultsTemplate from './ResultsTemplate.jsx';
import ResultInscriptionTemplate from './ResultInscriptionTemplate/ResultInscriptionTemplate.jsx';
import ResultFounderTemplate from './ResultFounderTemplate/ResultFounderTemplate.jsx';

const target = document.getElementById('reactTargetResultTemplate');

if (target!==null) {
    const searchParams = new URLSearchParams(window.location.search);
    let type = searchParams.get('type');
    switch (type) {
        case 'inscription':
            render(
            <ResultInscriptionTemplate
                result={searchParams.get('result')}
                message={searchParams.get('message')}
                name={searchParams.get('personal_name')}
                fds={searchParams.get('fds')}
            />,
                target
            );
            break;
    
        case 'registerfound':
            render(
                <ResultFounderTemplate
                    result={searchParams.get('result')}
                    message={searchParams.get('message')}
                    name={searchParams.get('personal_name')}
                />,
                target
            );
            break;
        default:
            render(
                <ResultsTemplate
                    result={searchParams.get('result')}
                    message={searchParams.get('message')}
                    name={searchParams.get('personal_name')}
                >
                <span> 
                    Algo salió mal, al parecer no está configurado 
                    el tipo de mensaje a mostrar.
                </span>
                </ResultsTemplate>,
            target
        );
            break;
    }
}
