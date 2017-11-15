import React, {Component} from 'react';
import api from '../../../api/api.jsx';


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
        
    }
    
    render(){
        
        if (this.state.data.result==='ok'&& this.state.data.status===200) {
            return(
                <RenderTable id={this.props} data={this.state.data.object}/>
            );            
        } else {
            
            return(
               <MessageError status={this.state.data.status} statusText={this.state.data.statusText}/>
            );            
        }
    }
}
function MessageError(props) {
    return(
        <div>
            <h2>Error {props.status}</h2>
            <h3>{props.statusText}</h3>
        </div>
    );
    
}
function RenderTable(props) {
    let rows = props.data;
    return(
        
         <table id={props.id}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Fecha inscripción</td>
                        <td>Invitado por</td>
                        <td>Paz y salvo</td>
                    </tr>
                </thead>
                <tbody>
                        {rows.map(row => {
                            <Row 
                                name={row.young.user.firs_name} 
                                inscription_date={row.inscription_date} 
                                invite_by={row.invite_by}
                                save={row.save}
                            />
                        })}
                </tbody>
            </table>
    );
}
function Row(props) {
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.inscription_date}</td>
            <td>{props.invite_by}</td>
            <td>{props.save}</td>
        </tr>
    );
}

export default InscriptionsList;