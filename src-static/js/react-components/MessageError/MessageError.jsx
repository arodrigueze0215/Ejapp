import React, {Component} from 'react';

/**
 *  Muestra un mensaje de error en pantalla cuando se obtiene un mensaje insesperado o
 *  la sesión no se encuentra activa
 * @param {*props} props 
 */
class MessageError extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h2>Error {this.props.status}</h2>
                <h3>{this.props.statusText}</h3>
            </div>
        );
    }
}

export default MessageError;