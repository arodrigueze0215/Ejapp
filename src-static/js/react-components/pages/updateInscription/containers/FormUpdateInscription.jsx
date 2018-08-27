
import React, { Component } from 'react';
import FormLayout from '../ui-components/FormLayout.jsx';
import DataYoungToUpdate from '../ui-components/DataYoungToUpdate.jsx';
import DataStudyToUpdate from '../ui-components/DataStudyToUpdate.jsx';
import WhoLifeToUpdate from '../ui-components/WhoLifeToUpdate.jsx';
import DataWorkToUpdate from '../ui-components/DataWorkToUpdate.jsx';
import DataParentsToUpdate from '../ui-components/DataParentsToUpdate.jsx';
import DataBrothersToUpdate from '../ui-components/DataBrothersToUpdate.jsx';
import MostImportant from '../ui-components/MostImportantToUpdate.jsx';
import HealthToUpdate from '../ui-components/DataHealthToUpdate.jsx';
import GeneralInfo from '../ui-components/DataGeneralInfoToUpdate.jsx';
import api from '../../../../api/api';
import MessageError from '../../../Commons/MessageError/MessageError.jsx';
import ContentLoading from '../../../Commons/ContentLoading/ContentLoading.jsx';



class FormUpdateInscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsRequired: {
                personal_gender: true,
                personal_names: true,
                personal_lastnames: true,
                personal_dateborn: true,
                personal_email: true,
                personal_username: true,
            },
            dataInscription:{},
            enableStudyFields:true
        }
        this.enableStudyFields = this.enableStudyFields.bind(this);
    }
    async componentDidMount() {
        const detail =  await api.inscriptions.getYoungDetail();
        this.setState({
            dataInscription: detail
        })

    }
    render(){

        if (this.state.dataInscription.result==='ok'&& this.state.dataInscription.status===200) {
            return (
                <FormLayout>
                    <h2>Editar ficha.</h2>
                    <DataYoungToUpdate {...this.state}/>
                    <WhoLifeToUpdate {...this.state}/>
                    <DataStudyToUpdate {...this.state} enableFields={this.enableStudyFields}/>
                    <DataWorkToUpdate {...this.state}/>
                    <DataParentsToUpdate {...this.state}/>
                    <DataBrothersToUpdate {...this.state}/>
                    <MostImportant {...this.state}/>
                    <HealthToUpdate {...this.state}/>
                    <GeneralInfo {...this.state}/>
                    <section className="Main__submit">
                        <button type="submit" 
                            value="submit" 
                            className="Main__submit__updateInscription button">Actualizar
                        </button>
                    </section>
                </FormLayout>
            );
        } else if(this.state.dataInscription.result==='error'){
        
            return(
            <MessageError status={this.state.dataInscription.status} statusText={this.state.dataInscription.statusText}/>
            );            
        } else{
            return(
            <ContentLoading/>
            );            
            
        }
        
    }

    /**
     * Event to enable o disable the fields of the study information
     * @param {Event} event 
     */
    enableStudyFields(event) {
        if (event.target.value=='true') {
            this.setState({
                enableStudyFields:true
            })            
        } else{
            this.setState({
                enableStudyFields:false
            })
        }
    }
}
export default FormUpdateInscription;
