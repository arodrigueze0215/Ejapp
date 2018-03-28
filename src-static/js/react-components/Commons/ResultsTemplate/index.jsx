import React from 'react';
import ResultsTemplate from './ResultsTemplate.jsx';
import {render} from 'react-dom';
const target = document.getElementById('reactTargetResultTemplate');

let MainResultTemplate = (props) =>{
    const searchParams = new URLSearchParams(window.location.search);
    return(        
        <div className="Main">
            <ResultsTemplate 
                result={searchParams.get('result')}
                message={searchParams.get('message')}
                personal_name={searchParams.get('personal_name')}
                fds={searchParams.get('fds')}
                />   
        </div>
    );
}
 
if (target!==null) {
    render(
       <MainResultTemplate/>,
        target
    );    
}
