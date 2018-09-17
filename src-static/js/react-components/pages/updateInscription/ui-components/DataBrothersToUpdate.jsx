import React, {Component} from 'react';
import api from '../../../../api/api';
import MessageError from '../../../Commons/MessageError/MessageError.jsx';
import ContentLoading from '../../../Commons/ContentLoading/ContentLoading.jsx';

class DataBrothersToUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            resultResponse:'',
            statusResponse:0,
            statusText:'',
            brothers:[],
            name:'',
            date:'',
            phone:'',
            email:'',
            relation:'',
            brother_compact:''
        }
        this.chooseRelation = [
            {'id':1,'text':'Hermano'},
            {'id':2,'text':'Hermana'},
            {'id':3,'text':'Primo'},
            {'id':4,'text':'Prima'}
        ]
        this.handlerOnchange = this.handlerOnchange.bind(this);
        this.eventAddBrother = this.eventAddBrother.bind(this);

    }
    async componentDidMount() {
        const dataBrothers =  await api.brothers.getBrothersList();
        const {bodyObject} =dataBrothers.object;
        this.setState({
            resultResponse: dataBrothers.result,
            statusResponse: dataBrothers.status,
            statusText: dataBrothers.statusText,
            brothers: bodyObject
        })

    }

    render(){
        if (this.state.resultResponse==='ok'&& this.state.statusResponse===200) {
            const brothers = this.state.brothers;            
            return(
                <section className="Main__family__brothers">
                    <div>
                        <h4> Datos de tus hermanos (as) /Primos (as)</h4>
                        <div className="callout warning">
                            <h5>Importante!!</h5>
                            <p>Si tienes hermanos (as) /Primos (as) debes agregar uno a uno, llenando su información y luego presionando el botón "Agregar". A medida que agregas hermanos aparecerá sus datos en la parte inferior "Lista de hermanos" .</p>
                            <p>En caso de que no tengas hermanos simplemente pasa a la sección siguiente.</p>
                            <p></p>
                        </div>
                        <div className="Main__family__brothers__data">
                            <label className="Main__family__brothers__data__names">Nombre completo
                                <input 
                                    type="text" 
                                    name="data-brothers-names" 
                                    onChange={this.handlerOnchange}
                                    placeholder="Nombres y apellidos"/>
                            </label>
                            <label className="Main__family__brothers__data__date">Fecha de nacimiento
                                <input
                                    type="date" 
                                    name="data-brothers-date"
                                    onChange={this.handlerOnchange}
                                    placeholder="2000-02-15"/>
                            </label>
                            <label className="Main__family__brothers__data__phone">Telefono móvil
                                <input
                                    type="tel" 
                                    name="data-brothers-phone"
                                    onChange={this.handlerOnchange} 
                                    placeholder="# celular"/>
                            </label>
                            <label className="Main__family__brothers__data__email">Correo electrónico
                                <input
                                    type="email" 
                                    name="data-brothers-email" 
                                    onChange={this.handlerOnchange}
                                    placeholder="Correo"/>
                            </label>
                            <select name="relation" className="Main__family__brothers__data__relations" onChange={this.handlerOnchange}>
                                    <option>Escoge uno</option>
                                    <option value={this.chooseRelation[0].id}>{this.chooseRelation[0].text}</option>
                                    <option value={this.chooseRelation[1].id}>{this.chooseRelation[1].text}</option>
                                    <option value={this.chooseRelation[2].id}>{this.chooseRelation[2].text}</option>
                                    <option value={this.chooseRelation[3].id}>{this.chooseRelation[3].text}</option>
                                    
                            </select>
                            <button  
                                type="button" 
                                className="Main__family__brothers__data__save button"
                                onClick={this.eventAddBrother}>
                                Agregar
                            </button>
                        </div>
                        <div className="Main__family__brothers__table">
                            <h5> Lista de hermanos</h5>
                            <table id="listBroders" className="table-scroll">
                                <thead>
                                    <tr>
                                        <th>nombres</th>
                                        <th>Fecha nacimiento</th>
                                        <th>Teléfono</th>
                                        <th>Correo Electrónico</th>
                                        <th>Relación</th>
                                        <th>Vivo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Tr brothers={brothers} chooseRelation={this.chooseRelation}/>
                                </tbody>
                            </table>
                        </div>
                        <input type="hidden" name="list_brothers" value={this.state.brother_compact}/>
                    </div>
                </section>
            );
        }else if(this.state.resultResponse==='error'){        
            return(
            <MessageError status={this.state.statusResponse} statusText={this.state.statusText}/>
            );            
        } else{
            return(
                <ContentLoading/>
            );            
            
        }
    
    }

    eventAddBrother(ev){
        ev.preventDefault();
        const name_brother = this.state.name;
        const date_born = this.state.date;
        const mobile_phone = this.state.phone;
        const email = this.state.email;
        const relationship = this.state.relation;
        const bro = {
            id:-1,
            name_brother,
            date_born,
            mobile_phone,
            email,
            relationship,
            isalive:true
        }
        let nBrothers = this.state.brothers
        nBrothers.push(bro);
        let compact = JSON.stringify(nBrothers);
        this.setState({
            brothers: nBrothers,
            brother_compact: compact
        });
    }
    handlerOnchange(ev){
        ev.preventDefault();
        switch (ev.target.name) {
            case 'data-brothers-names':
                this.setState({
                    name: ev.target.value
                });
                break;        
            case 'data-brothers-date':
                this.setState({
                    date: ev.target.value
                });
                break;
            case 'data-brothers-phone':
                this.setState({
                    phone: ev.target.value
                });
                break;
            case 'data-brothers-email':
                this.setState({
                    email: ev.target.value
                });
                break;
            case 'relation':
                this.setState({
                    relation: ev.target.value
                });
                break;
            default:
                break;
        }

    }
}
let Tr = props =>{
    const tr = props.brothers.map(brother => {
        let relationText = getRelation(brother.relationship, props.chooseRelation)
        return(
            <tr key={brother.id>0?brother.id:brother.id--}>
                <td>{brother.name_brother}</td>
                {brother.date_born.length>0?(<td>{brother.date_born}</td>):(<td>No tiene</td>)}
                {brother.mobile_phone.length>0?(<td>{brother.mobile_phone}</td>):(<td>No tiene</td>)}
                {brother.email.length>0?(<td>{brother.email}</td>):(<td>No tiene</td>)}
                <td>{relationText}</td>
                {brother.isalive?(<td>Sí</td>):(<td>No</td>)}
            </tr>
        )
    })
    return tr;
}

function getRelation(id, arr) {
    let text;
    arr.forEach(element => {
        if (element.id ==id)
            text = element.text;
    });
    return text;
}
export default DataBrothersToUpdate;