import React, {Component} from 'react';

class HeaderYoungDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <InfoUser young={this.props}/>
        );

    }
}

let InfoUser =(props)=>{
    let row = props.young;
    const fullName = `${row.user.first_name} ${row.user.last_name}`;
    const trRows=        
        <Row 
            name= {fullName}
            email= {row.user.email}
            born= {row.date_born}
            address= {row.address}
            home_phone= {row.home_phone}
            mobile_phone= {row.mobile_phone}
            occupation= {row.occupation}
            profession= {row.profession}
            gender= {row.gender}
        />;   

    return(
        <article>
            <h1>Información Personal</h1>
            <table>
                <thead>
                    <tr>
                        <td>Nombres</td>
                        <td>Correo</td>
                        <td>Fecha nacimiento</td>
                        <td>Dirección</td>
                        <td>Telefonos / Celular</td>
                        <td>Ocupación / Profesión</td>
                        <td>Genero</td>
                    </tr>
                </thead>
                <tbody>
                    {trRows}
                </tbody>
            </table>
        </article>
    );
}

let Row = (props) =>{
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.born}</td>
            <td>{props.address}</td>
            <td>{props.home_phone} <strong>/</strong> {props.mobile_phone}</td>
            <td>{props.occupation} <strong>/</strong> {props.profession}</td>
            <td>{props.gender}</td>
        </tr>
    );
}

export default HeaderYoungDetail;