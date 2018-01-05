import React, {Component} from 'react';
import api from '../../../api/api.jsx';
import MessageError from '../../MessageError/MessageError.jsx';
import ContentLoading from '../../ContentLoading/ContentLoading.jsx';
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
    onClickRow(idrow, idyoung){
        console.log('click', idrow);
        let url = window.location.origin;
        url = `${url}/inscrito/detalle/?id=${idrow};idyoung=${idyoung}`
        console.log(url);

        window.location.href = url;
    }
    
    render(){
        
        if (this.state.data.result==='ok'&& this.state.data.status===200) {
            return(
                <RenderTable {
                    ...this.props} 
                    onClickRow={this.onClickRow} 
                    data={this.state.data.object.bodyObject} 
                    header={this.state.data.object.headerObject}
                />
            );            
        } else if(this.state.data.result==='error'){
            
            return(
               <MessageError 
                    status={this.state.data.status} 
                    statusText={this.state.data.statusText}
                />
            );            
        } else{
            return(
               <MessageLoading/>
            );            
            
        }
    }
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
    let rows = props.data;
     
    const trRows=rows.map(row => {
        let fullName = `${row.young.user.first_name} ${row.young.user.last_name}`

        return(<Row 
            key={row.id}
            id={row.id}
            name={fullName}  
            inscription_date={row.inscription_date} 
            invite_by={row.who_invite_me}
            save={row.pieces_save}
            idyoung={row.young.id}
            onClickRow={props.onClickRow}
        />);

    });
    return(
        <section className={props.classSection}>
            <h2>Lista de inscritos FDS{props.header.number_fds}</h2>
            <table id={id} style={{width:"100%"}}>
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
            <td><button className="button" onClick={props.onClickRow.bind(this,props.id, props.idyoung)}>Ver más</button></td>
        </tr>
    );
}

export default InscriptionsList;