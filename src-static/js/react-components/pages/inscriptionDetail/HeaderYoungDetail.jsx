import React, {Componet} from 'react';

class HeaderYoungDetail extends Comment{
    constructor(props){
        super(proos);
    }
    render(){

    }
}

let InfoUser =(props)=>{

    return(
        <div>
            <h1>Información Personal</h1>
            <table>
                <thead>
                    <tr>
                        <td>Nombres</td>
                        <td>Correo</td>
                        <td>Dirección</td>
                        <td>Telefonos/Celular</td>
                        <td>Ocupación / Profesión</td>
                        <td>Genero</td>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    );

}

let Rows = (props) =>{
    return(
        <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.home_phone}/{props.mobile_phone}</td>
        <td>{props.occupation}/{props.profession}</td>
        <td>{props.gender}</td>
    </tr>
    );
}