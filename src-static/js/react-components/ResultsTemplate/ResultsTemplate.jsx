import React, {Component} from 'react';

class ResultsTemplate extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Template {...this.props}/>
        );

    }
}

let Template = (props)=>{
    return(
        <section className="section__resultTemplate">
            {props.result=='ok'&&
                <h1 className="section__resultTemplate__result">MUY BIEN</h1>
            }            
            <span className="section__resultTemplate__message">{props.message}</span>
            <span className="section__resultTemplate__name"><strong>{props.personal_name}</strong> te has inscrito para el <strong>FDS#{props.fds}</strong>  pronto nos comunicaremos contigo para darte todas las instrucciones</span>
        </section>
    );
}

export default ResultsTemplate;