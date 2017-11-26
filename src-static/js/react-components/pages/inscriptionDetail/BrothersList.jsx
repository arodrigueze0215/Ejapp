import React, {Component} from 'react';
import api from '../../../api/api.jsx';
import MessageError from '../../MessageError/MessageError.jsx';
import ContentLoading from '../../ContentLoading/ContentLoading.jsx';
class BrothersList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }

    async componentDidMount(){
        const data = await api.brothers.getBrothersList();
        this.setState({
            data
        });


    }
    render(){
        if (this.state.data.result==='ok'&& this.state.data.status>=200 && this.state.data.status<=207) {
            return(
                <Brothers data={this.state.data.object.bodyObject}/>
            );
        } else if(this.state.data.result==='error'){
        
            return(
            <MessageError status={this.state.data.status} statusText={this.state.data.statusText}/>
            );            
        } else{
            return(
            <ContentLoading/>
            );            
            
        }
    }
}
let Brothers =(props)=>{
    let rows = props.data;
    const trRows=rows.map(row=>{
        return(
            <Row 
                key ={row.id}
                relationship= {row.relationship}
                isalive= {row.isalive}
                name_brother= {row.name_brother}
                date_born= {row.date_born}
                email= {row.email}
                mobile_phone= {row.mobile_phone}
            />
        );

    });      

    return(
        <article>
            <h3>Datos hermanos</h3>
            <table className="unstriped">
                <thead>
                    <tr>
                        <td>Parentesco</td>
                        <td>Vive</td>
                        <td>Nombre</td>
                        <td>Fecha nacimiento</td>
                        <td>Correo</td>
                        <td>Teléfono celular</td>
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
            <td>{props.relationship}</td>
            {props.isalive?(<td>Sí</td>):(<td>No</td>)}
            <td>{props.name_brother}</td>
            {props.date_born.length>0?(<td>{props.date_born}</td>):(<td>No tiene</td>)}
            {props.email.length>0?(<td>{props.email}</td>):(<td>No tiene</td>)}
            {props.mobile_phone.length>0?(<td>{props.mobile_phone}</td>):(<td>No tiene</td>)}
        </tr>
    );
}

export default BrothersList;