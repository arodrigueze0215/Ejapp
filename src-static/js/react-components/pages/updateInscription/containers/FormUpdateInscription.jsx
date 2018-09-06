
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
                most_important_name: true,
                most_important_number:true
            },
            dataInscription:{},
            enableStudyFields:true,
            enableWorkFields:true,
            disableExperiencesWhichFields:true
        }
        this.enableStudyFields = this.enableStudyFields.bind(this);
        this.enableWorkFields = this.enableWorkFields.bind(this);
        this.disableExperienceFields = this.disableExperienceFields.bind(this);
    }
    async componentDidMount() {
        const dataInscription =  await api.inscriptions.getYoungDetail();
        const dataBrothers =  await api.brothers.getBrothersList();
        this.setState({
            dataInscription,
            dataBrothers,
            enableStudyFields:!dataInscription.bodyObject.do_you_study,
            enableWorkFields:!dataInscription.bodyObject.do_you_work,
            disableExperiencesWhichFields: !dataInscription.bodyObject.other_experiences,
        });

    }
    render(){

        if (this.state.dataInscription.result==='ok'&& this.state.dataInscription.status===200) {            
            return (
                <FormLayout>
                    <h2>Editar ficha.</h2>
                    <DataYoungToUpdate {...this.state}/>
                    <WhoLifeToUpdate {...this.state}/>
                    <DataStudyToUpdate {...this.state} enableFields={this.enableStudyFields}/>
                    <DataWorkToUpdate {...this.state} enableFields={this.enableWorkFields}/>
                    <DataParentsToUpdate {...this.state} enableFields={this.disableParentsFields}/>
                    <DataBrothersToUpdate {...this.state}/>
                    <MostImportant {...this.state}/>
                    <HealthToUpdate {...this.state}/>
                    <GeneralInfo {...this.state} enableFields={this.disableExperienceFields}/>
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

    enableStudyFields(event)  {
        if (event.target.value=='true') {
            this.setState({
                enableStudyFields:false
            })            
        } else{
            this.setState({
                enableStudyFields:true
            })
        }
    }
    enableWorkFields(event)  {
        if (event.target.value=='true') {
            this.setState({
                enableWorkFields:false
            })

        } else{
            this.setState({
                enableWorkFields:true
            })
        }
    }
    disableExperienceFields(event)  {
        if (event.target.value=='true') {
            this.setState({
                disableExperiencesWhichFields:false
            })

        } else{
            this.setState({
                disableExperiencesWhichFields:true
            })

        }
    }

}
export default FormUpdateInscription;
