import React, {Component} from 'react';
import api from '../../../api/api.jsx';
import initDatatable from './initDatatable.js';
import moment from 'moment';

class InscriptionsList extends Component{
    constructor(props){
        super(props);
        this.state={
            data: {},
        }
    }
    async componentDidMount(){
        const data = await api.inscriptions.getInscriptionList();
        this.setState({
            data, // no necesito decir data=data es2017 me comprime y obvia el data del state con la de la api
        });
        initDatatable(); //inicia el las propiedades del plugin datatable

        
    }
    
    render(){
        
        if (this.state.data.result==='ok'&& this.state.data.status===200) {
            return(
                <RenderTable {...this.props} data={this.state.data.object.bodyObject} header={this.state.data.object.headerObject}/>
            );            
        } else if(this.state.data.result==='error'){
            
            return(
               <MessageError status={this.state.data.status} statusText={this.state.data.statusText}/>
            );            
        } else{
            return(
               <MessageLoading/>
            );            
            
        }
    }
}
/**
 *  Muestra un mensaje de error en pantalla cuando se obtiene un mensaje insesperado o
 *  la sesión no se encuentra activa
 * @param {*props} props 
 */
let MessageError=(props) =>{
    return(
        <div>
            <h2>Error {props.status}</h2>
            <h3>{props.statusText}</h3>
        </div>
    );
    
}
let MessageLoading=(props) =>{
    return(
        <div>
            <h2>Cargando...</h2>
        </div>
    );
    
}
let RenderTable=(props)=> {
    let id = props.id;
    console.log('props', props)
    let rows = props.data;
    const trRows=rows.map(row => {
        let fullName = `${row.young.user.first_name} ${row.young.user.last_name}`

        return(<Row 
            key={row.id}
            id={row.id}
            name={fullName}  
            inscription_date={row.inscription_date} 
            invite_by={row.who_intive_me}
            save={row.pieces_save}
        />);

    });
    return(
        <section className={props.classSection}>
            <h2>Lista de inscritos FDS{props.header.number_fds}</h2>
            <table id={id}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Fecha inscripción</td>
                        <td>Invitado por</td>
                        <td>Paz y salvo</td>
                        <td>Más</td>
                    </tr>
                </thead>
                <tbody>
                        {trRows}
                </tbody>
            </table>
        </section>
    );
}
let Row= (props)=> {
    return(
        <tr data-id={props.id}>
            <td>{props.name}</td>
            <td>{moment(props.inscription_date).format('MMMM Do YYYY')}</td>
            <td>{props.invite_by}</td>
            <td>{props.save}</td>
            <td><button className="button">Ver más</button></td>
        </tr>
    );
}

export default InscriptionsList;