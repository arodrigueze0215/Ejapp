import React, {Component} from 'react';
import api from '../../../api/api.jsx';
import MessageError from '../../MessageError/MessageError.jsx';
import ContentLoading from '../../ContentLoading/ContentLoading.jsx';
class ParentsList extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }

    async componentDidMount(){
        const data = await api.parents.getParentsList();
        this.setState({
            data
        });


    }
    render(){
        if (this.state.data.result==='ok'&& this.state.data.status>=200 && this.state.data.status<=207) {
            return(
                <Parents data={this.state.data.object.bodyObject}/>
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
let Parents =(props)=>{
    let rows = props.data;
    const trRows=rows.map(row=>{
        return(
            <Row 
                key ={row.id}
                relationship= {row.relationship}
                isalive= {row.isalive}
                name_parent= {row.name_parent}
                occupation= {row.occupation}
                home_phone= {row.home_phone}
                mobile_phone= {row.mobile_phone}
                address= {row.address}
            />
        );

    });      

    return(
        <article className="content__inscriptionDetail__parents">
            <h3>Datos papás</h3>
            <table className="unstriped">
                <thead>
                    <tr>
                        <td>Parentesco</td>
                        <td>Vive</td>
                        <td>Nombre</td>
                        <td>Ocupación</td>
                        <td>Teléfono casa</td>
                        <td>Teléfono celular</td>
                        <td>Dirección</td>
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
            <td>{props.name_parent}</td>
            {props.occupation.length>0?(<td>{props.occupation}</td>):(<td>No tiene</td>)}
            {props.home_phone.length>0?(<td>{props.home_phone}</td>):(<td>No tiene</td>)}
            {props.mobile_phone.length>0?(<td>{props.mobile_phone}</td>):(<td>No tiene</td>)}
            {props.address.length>0?(<td>{props.address}</td>):(<td>No tiene</td>)}
        </tr>
    );
}

export default ParentsList;