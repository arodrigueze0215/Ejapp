import React, {Component} from 'react';

/**
 *  Muestra un mensaje de error en pantalla cuando se obtiene un mensaje insesperado o
 *  la sesión no se encuentra activa
 */
class ContentLoading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="loadingComponent">
                <div className="loadingComponent__loader"></div>
                { this.props.text ?
                  (<h2> {this.props.text} </h2>):
                  (<h2> Cargando el contenido.. </h2>)
                }
            </div>
        );
    }
}
export default ContentLoading;
