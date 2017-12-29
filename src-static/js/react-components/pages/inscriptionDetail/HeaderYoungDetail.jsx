import React, {Component} from 'react';

class HeaderYoungDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <InfoBasicUser {...this.props}/>
                <InfoUser {...this.props}/>
            </div>
        );

    }
}
let InfoBasicUser =(props)=>{
    return(
        <article className="inscriptionDetail__basic">
            <h3>Información básica del participante</h3>
            <table className="inscriptionDetail__basic__tableDetail">
                <thead>
                    <tr>
                        <td>Nombres</td>
                        <td>Apellidos</td>
                        <td>Correo</td>
                        <td>Fecha nacimiento</td>
                        <td>Dirección</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.user.first_name}</td>
                        <td>{props.user.last_name}</td>
                        <td>{props.user.email}</td>
                        <td>{props.date_born}</td>
                        <td>{props.address}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}

let InfoUser =(props)=>{
    return(
        <article className="inscriptionDetail__contact">
            <h3>Información de contacto</h3>
            <table className="inscriptionDetail__contact__tableInfo">
                <thead>
                    <tr>
                        <td>Telefonos</td>
                        <td>Celular</td>
                        <td>Ocupación</td>
                        <td>Profesión</td>
                        <td>Género</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.home_phone.length>0?(<td>{props.home_phone}</td>):(<td>No tiene</td>)} 
                        {props.mobile_phone.length>0?(<td>{props.mobile_phone}</td>):(<td>No tiene</td>)}
                        {props.occupation.length>0?(<td>{props.occupation}</td>):(<td>No tiene</td>)}            
                        {props.profession.length>0?(<td>{props.profession}</td>):(<td>No tiene</td>)}            
                        {props.gender?(<td>Masculino</td>):(<td>Femenino</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
export default HeaderYoungDetail;