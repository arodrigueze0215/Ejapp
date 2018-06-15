import React from 'react';

function ResultsTemplate(props){
    return(
        <section className="section__resultTemplate">
            {props.result=='ok'&&
                <h1 className="section__resultTemplate__result">MUY BIEN</h1>
            }
            <span className="section__resultTemplate__message">{props.message}</span>
            <span className="section__resultTemplate__name">
                {props.children}
            </span>
        </section>
    );
}

export default ResultsTemplate;