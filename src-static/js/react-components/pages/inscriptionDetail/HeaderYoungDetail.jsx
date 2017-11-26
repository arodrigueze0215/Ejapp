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
            <h1>Información de participante</h1>
            <h3>{fullName}</h3>
            <h5>{row.user.email}</h5>
            <table>
                <thead>
                    <tr>
                        <td>Fecha nacimiento</td>
                        <td>Dirección</td>
                        <td>Telefonos / Celular</td>
                        <td>Ocupación / Profesión</td>
                        <td>Género</td>
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
            <td>{props.born}</td>
            <td>{props.address}</td>
            <td>{props.home_phone} <strong>/</strong> {props.mobile_phone}</td>
            <td>{props.occupation} <strong>/</strong> {props.profession}</td>
            <td>{props.gender}</td>
        </tr>
    );
}

export default HeaderYoungDetail;