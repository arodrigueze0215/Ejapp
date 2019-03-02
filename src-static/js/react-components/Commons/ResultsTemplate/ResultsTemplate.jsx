import React from 'react';

function ResultsTemplate(props){
    return(
        <section className="section__resultTemplate">
            {props.result=='ok'&&
                <h1 className="section__resultTemplate__result">MUY BIEN</h1>
            }
            <span className="section__resultTemplate__message">{props.message}</span>
            {props.children}
        </section>
    );
}

export default ResultsTemplate;