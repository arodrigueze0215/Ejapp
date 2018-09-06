import React, {Component} from 'react';
import MessageError from '../../../Commons/MessageError/MessageError.jsx';
import api from '../../../../api/api.js';
import ContentLoading from '../../../Commons/ContentLoading/ContentLoading.jsx';



class DataParentsToUpdate extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataParents:{}
        }
        this.disableFields = this.disableFields.bind(this);
    }

    async componentDidMount(){
        const dataParents =  await api.parents.getParentsList();
        let data =dataParents.object.bodyObject;
        let mom = data.filter(parent=> parent.relationship==='Mamá')[0];
        let dad = data.filter(parent=> parent.relationship==='Papá')[0];
        console.log('data', data)
        console.log('mom', mom)
        console.log('dad', dad)
        this.setState({
            dataParents,
            dad,
            mom,
            disableMomFields:!mom.isalive,
            disableDadFields:!dad.isalive
        })
    }

    disableFields(events) {
        switch (events.target.id) {
            case 'mom_no':
                this.setState({
                    disableMomFields:true
                })
                break;
            case 'mom_yes':
                this.setState({
                    disableMomFields:false
                })
                break;
            case 'dad_no':
                this.setState({
                    disableDadFields:true
                })
                break;
            case 'dad_yes':
                this.setState({
                    disableDadFields:false
                })
                break;        
            default:
                break;
        }
    }
    render(){
        if (this.state.dataParents.result==='ok'&& this.state.dataParents.status===200) {
            return(
                <section className="Main__family">
                    <h2> Datos Familiares</h2>
                    <div className="Main__family__dad">
                        <h4> Datos de tu papá</h4>
                        <div className="Main__family__dad__question">
                            <fieldset className="large-6 columns">
                                <legend>¿Aún vive?</legend>
                                <input 
                                    type="radio" 
                                    name="dad" 
                                    value={true} 
                                    id="dad_yes"
                                    defaultChecked={this.state.dad.isalive} 
                                    onChange={this.disableFields}
                                    required
        
                                />
                                <label htmlFor="dad_yes">Sí</label>
                                <input 
                                    type="radio" 
                                    name="dad" 
                                    value={false} 
                                    id="dad_no"
                                    defaultChecked={!this.state.dad.isalive}
                                    onChange={this.disableFields}
                                />
                                <label htmlFor="dad_no">No</label>
                            </fieldset>                        
                        </div>
                        <div className="Main__family__dad__data__one">
                            <label className="Main__family__dad__data__one__names">Nombre completo
                                <input 
                                    type="text" 
                                    name="dad_names" 
                                    placeholder="Nombres y apellidos"
                                    defaultValue={this.state.dad.name_parent}
                                    required
                                />
                            </label>
                            <label className="Main__family__dad__data__one__ocupation">Ocupación
                                <input 
                                    type="text" 
                                    name="dad_ocupation" 
                                    placeholder="A que se dedica tu papá"
                                    defaultValue={this.state.dad.occupation}
                                    disabled={this.state.disableDadFields}
                                />
                            </label>
                        </div>
                        <div className="Main__family__dad__data__two">
                            <label className="Main__family__dad__data__two__phoneHome">Teléfono
                                <input 
                                    type="tel" 
                                    name="dad_phone_home" 
                                    placeholder="# telefono de la casa"
                                    defaultValue={this.state.dad.home_phone}
                                    disabled={this.state.disableDadFields}
                                />
                            </label>
                            <label className="Main__family__dad__data__two__phone">Teléfono celular
                                <input 
                                    type="tel" 
                                    name="dad_phone" 
                                    placeholder="# telefono celular"
                                    defaultValue={this.state.dad.mobile_phone}
                                    disabled={this.state.disableDadFields}
                                />
                            </label>
                            <label className="Main__family__dad__data__two__address">Dirección
                                <input 
                                    type="text" 
                                    name="dad_address" 
                                    placeholder="Dirección donde vive tu papá"
                                    defaultValue={this.state.dad.address}
                                    disabled={this.state.disableDadFields}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="Main__family__mom">
                        <h4> Datos de tu mamá</h4>
                        <div className="Main__family__mom__question">
                            <fieldset className="large-6 columns">
                                <legend>¿Aún vive?</legend>
                                <input 
                                    type="radio" 
                                    name="mom" value={true} 
                                    id="mom_yes" 
                                    required 
                                    defaultChecked={this.state.mom.isalive}
                                    onChange={this.disableFields}
                                />
                                <label htmlFor="mom_yes">Sí</label>
                                <input
                                    type="radio"
                                    name="mom"
                                    value={false}
                                    id="mom_no"
                                    defaultChecked={!this.state.mom.isalive}
                                    onChange={this.disableFields}
                                />
                                <label htmlFor="mom_no">No</label>
                            </fieldset>                        
                        </div>
                        <div className="Main__family__mom__data__one">
                            <label className="Main__family__mom__data__one__names">Nombre completo
                                <input 
                                    type="text" 
                                    name="mom_names" 
                                    placeholder="Nombres y apellidos" 
                                    required 
                                    defaultValue={this.state.mom.name_parent}
                                />
                                    
                            </label>
                            <label className="Main__family__mom__data__one__ocupation">Ocupación
                                <input 
                                    type="text" 
                                    name="mom_ocupation" 
                                    placeholder="A que se dedica tu mamá" 
                                    defaultValue={this.state.mom.occupation}
                                    disabled={this.state.disableMomFields}
                                />
                            </label>
                        </div>
                        <div className="Main__family__mom__data__two">
                            <label className="Main__family__mom__data__two__phoneHome">Teléfono
                                <input 
                                type="tel" 
                                name="mom_phone_home" 
                                placeholder="# telefono de la casa" 
                                defaultValue={this.state.mom.home_phone}
                                disabled={this.state.disableMomFields}
                            />
                            </label>
                            <label className="Main__family__mom__data__two__phone">Teléfono celular
                                <input 
                                    type="tel" 
                                    name="mom_phone" 
                                    placeholder="# telefono celular" 
                                    defaultValue={this.state.mom.mobile_phone}
                                    disabled={this.state.disableMomFields}
                                />
                            </label>
                            <label className="Main__family__mom__data__two__address">Dirección
                                <input 
                                    type="text" 
                                    name="mom_address" 
                                    placeholder="Dirección donde vive tu mamá" 
                                    defaultValue={this.state.mom.address}
                                    disabled={this.state.disableMomFields}
                                />
                            </label>
                        </div>
                    </div>
                </section>
            );
        }else if(this.state.dataParents.result==='error'){        
            return(
            <MessageError status={this.state.dataParents.status} statusText={this.state.dataParents.statusText}/>
            );            
        } else{
            return(
                <ContentLoading/>
            );            
            
        }
    }
}
export default DataParentsToUpdate;