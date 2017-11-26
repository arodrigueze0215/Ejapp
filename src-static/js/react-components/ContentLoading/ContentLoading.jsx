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
            <div>
                <h2>Cargando...</h2>
            </div>
        );
    }
}
export default ContentLoading;