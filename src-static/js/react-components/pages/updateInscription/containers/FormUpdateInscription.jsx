
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
        this.dataToSend = {}
        this.state = {
            fieldsRequired: {
                personal_gender: true,
                personal_names: true,
                personal_lastnames: true,
                personal_dateborn: true,
                personal_email: true,
                isIstudent:true,
                hasJob:true,
                hasDad:true,
                hasMom:true,
                hasDadName:true,
                hasMomName:true,
                most_important_name: true,
                most_important_number:true,
                who_invite_me:true,
                who_invite_me_number:true,
                why_fds:true,
                other_experiences:true
            },
            dataInscription:{},
            enableStudyFields:true,
            enableWorkFields:true,
            disableExperiencesWhichFields:true
        }
        this.enableStudyFields = this.enableStudyFields.bind(this);
        this.enableWorkFields = this.enableWorkFields.bind(this);
        this.disableExperienceFields = this.disableExperienceFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        const dataInscription =  await api.inscriptions.getYoungDetail();
        this.setState({
            dataInscription,
            enableStudyFields:!dataInscription.bodyObject.do_you_study,
            enableWorkFields:!dataInscription.bodyObject.do_you_work,
            disableExperiencesWhichFields: !dataInscription.bodyObject.other_experiences,
        });

    }
    render(){

        if (this.state.dataInscription.result==='ok'&& this.state.dataInscription.status===200) {            
            return (
                <FormLayout handleSubmit={this.handleSubmit}>
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
    async handleSubmit(event){
        event.preventDefault();
        let nIns = this.prepareDataToSend(event);
        if (nIns) {
            console.log('dataToSend',this.dataToSend);
            const {description} = this.dataToSend;
            const {mom} = this.dataToSend;
            const {dad} = this.dataToSend;
            const {brothers} = this.dataToSend;
            const responseIns = await api.inscriptions.updateInscription(description);
            if (responseIns['result']=='ok' && responseIns['status']==200) {
                const responsedad = await api.parents.updateParent(dad);
                if (responsedad['result']=='ok' && responsedad['status']==200) {
                    console.log('dad',responsedad['statusText']);
                }
                const responsemom = await api.parents.updateParent(mom);
                if (responsemom['result']=='ok' && responsemom['status']==200) {
                    console.log('mom',responsemom['statusText']);
                }
                console.log('str_brothers', brothers['brothers']);
                const responsebrothers = await api.brothers.updateBrothers(brothers);
                console.log('brothers',responsebrothers);
                if (responsebrothers['result']=='ok' && responsebrothers['status']==200) {
                    console.log('brothers',responsebrothers['statusText']);
                }
            }
            
        }


    }

    prepareDataToSend(event) {
        //DataYoungToUpdate
        let description = {}
        description.personal_gender = event.target.elements['personal_gender'].value;
        description.personal_names = event.target.elements['personal_names'].value;
        description.personal_lastnames = event.target.elements['personal_lastnames'].value;
        description.personal_dateborn = event.target.elements['personal_dateborn'].value;
        description.personal_homephone = event.target.elements['personal_homephone'].value;
        description.personal_mobilephone = event.target.elements['personal_mobilephone'].value;
        description.personal_address = event.target.elements['personal_address'].value;
        description.personal_email = event.target.elements['personal_email'].value;
        description.personal_profession = event.target.elements['personal_profession'].value;
        description.personal_occupation = event.target.elements['personal_occupation'].value;
        //WhoLifeToUpdate
        description.life_with_gran = event.target.elements['life_with_gran'].checked;
        description.life_with_parent = event.target.elements['life_with_parent'].checked;
        description.life_with_only_mother = event.target.elements['life_with_only_mother'].checked;
        description.life_with_only_father = event.target.elements['life_with_only_father'].checked;
        description.life_with_uncles = event.target.elements['life_with_uncles'].checked;
        description.life_with_friends = event.target.elements['life_with_friends'].checked;
        description.life_with_cousins = event.target.elements['life_with_cousins'].checked;
        description.life_with_brothers = event.target.elements['life_with_brothers'].checked;
        description.life_with_alone = event.target.elements['life_with_alone'].checked;
        //DataStudyToUpdate
        description.do_you_study = event.target.elements['do_you_study'].value=='true'?true:false;
        description.study_carrer = event.target.elements['study_carrer'].value;
        description.study_where = event.target.elements['study_where'].value;

        description.do_you_work = event.target.elements['do_you_work'].value=='true'?true:false;
        description.work_company = event.target.elements['work_company'].value;
        description.work_role = event.target.elements['work_role'].value;
        //DataParentsToUpdate
        let dad = {}
        let mom = {}
        dad.isalive_parent = event.target.elements['dad'].value=='true'?true:false;
        dad.relationship_parent = '2';
        dad.names_parent = event.target.elements['dad_names'].value;
        dad.occupation_parent = event.target.elements['dad_ocupation'].value;
        dad.phone_home_parent = event.target.elements['dad_phone_home'].value;
        dad.phone_parent = event.target.elements['dad_phone'].value;
        dad.address_parent = event.target.elements['dad_address'].value;
        mom.isalive_parent = event.target.elements['mom'].value=='true'?true:false;
        mom.relationship_parent = '1';
        mom.names_parent = event.target.elements['mom_names'].value;
        mom.occupation_parent = event.target.elements['mom_ocupation'].value;
        mom.phone_home_parent = event.target.elements['mom_phone_home'].value;
        mom.phone_parent = event.target.elements['mom_phone'].value;
        mom.address_parent = event.target.elements['mom_address'].value;
        //DataBrothersToUpdate
        let brotherslist = {}
        brotherslist.brothers = event.target.elements['list_brothers'].value;
        console.log('brohterlist', brotherslist)
        //MostImportantToUpdate
        description.person_mostimportant_name = event.target.elements['person_mostimportant_name'].value;
        description.person_mostimportant_number = event.target.elements['person_mostimportant_number'].value;
        //DataHealthToUpdate
        description.illness = event.target.elements['illness'].value;
        description.especial_food = event.target.elements['especial_food'].value;
        description.special_medicine = event.target.elements['special_medicine'].value;
        description.eps = event.target.elements['eps'].value;
        //DataGeneralInfoToUpdate
        description.who_invite_me = event.target.elements['who_invite_me'].value;
        description.who_invite_me_number = event.target.elements['who_invite_me_number'].value;
        description.why_fds = event.target.elements['why_fds'].value;
        description.do_you_want_ej = event.target.elements['do_you_want_ej'].value=='true'?true:false;
        description.other_experiences = event.target.elements['other_experiences'].value=='true'?true:false;
        description.experiences_which = event.target.elements['experiences_which'].value;
        let i = 0;
        let fieldsRequired = this.state.fieldsRequired;
        if (description.personal_gender.length===0) {
            fieldsRequired['personal_gender'] = false;
            i++;
        } else {
            fieldsRequired['personal_gender'] = true;
        }
        if (description.personal_names.length===0) {
            fieldsRequired['personal_names'] = false;
            i++;
        }else {
            fieldsRequired['personal_names'] = true;
        }
        if (description.personal_lastnames.length===0) {
            fieldsRequired['personal_lastnames'] = false;
            i++;
        } else {
            fieldsRequired['personal_lastnames'] = true;
        }
        if (description.personal_dateborn.length===0) {
            fieldsRequired['personal_dateborn'] = false;
            i++;
        } else {
            fieldsRequired['personal_dateborn'] = true;
        }
        if (description.personal_email.length===0) {
            fieldsRequired['personal_email'] = false;
            i++;
        } else {
            fieldsRequired['personal_email'] = true;
        }
        if (description.do_you_study.length===0) {
            fieldsRequired['isIstudent'] = false;
            i++;
        } else {
            fieldsRequired['isIstudent'] = true;
        }
        if (description.do_you_work.length===0) {
            fieldsRequired['hasJob'] = false;
            i++;
        } else {
            fieldsRequired['hasJob'] = true;
        }
        if (dad.isalive_parent.length===0) {
            fieldsRequired['hasDad'] = false;
            i++;
        } else {
            fieldsRequired['hasDad'] = true;
        }
        if (mom.isalive_parent.length===0) {
            fieldsRequired['hasMom'] = false;
            i++;
        } else {
            fieldsRequired['hasMom'] = true;
        }
        if (dad.names_parent.length===0) {
            fieldsRequired['hasDadName'] = false;
            i++;
        } else {
            fieldsRequired['hasDadName'] = true;
        }
        if (mom.names_parent.length===0) {
            fieldsRequired['hasMomName'] = false;
            i++;
        } else {
            fieldsRequired['hasMomName'] = true;
        }
        if (description.person_mostimportant_name.length===0) {
            fieldsRequired['most_important_name'] = false;
            i++;
        } else {
            fieldsRequired['most_important_name'] = true;
        }
        if (description.person_mostimportant_number.length===0) {
            fieldsRequired['most_important_number'] = false;
            i++;
        } else {
            fieldsRequired['most_important_number'] = true;
        }
        if (description.who_invite_me.length===0) {
            fieldsRequired['who_invite_me'] = false;
            i++;
        } else {
            fieldsRequired['who_invite_me'] = true;
        }
        if (description.who_invite_me_number.length===0) {
            fieldsRequired['who_invite_me_number'] = false;
            i++;
        } else {
            fieldsRequired['who_invite_me_number'] = true;
        }
        if (description.why_fds.length===0) {
            fieldsRequired['why_fds'] = false;
            i++;
        } else {
            fieldsRequired['why_fds'] = true;
        }
        if (description.other_experiences.length===0) {
            fieldsRequired['other_experiences'] = false;
            i++;
        } else {
            fieldsRequired['other_experiences'] = true;
        }
        if (i>0) {
            this.setState({
                fieldsRequired
            })
            return false;
        }else {
            this.dataToSend.description = description;
            this.dataToSend.dad = dad;
            this.dataToSend.mom = mom;
            this.dataToSend.brothers = brotherslist;
            return true;
        }
    }

}
export default FormUpdateInscription;
