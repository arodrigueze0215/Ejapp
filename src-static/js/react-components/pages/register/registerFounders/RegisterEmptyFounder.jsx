import React, {Component} from 'react';
import DataYoung from './DataYoung.jsx'
import DataFound from '../DataFound.jsx'
import api from '../../../../api/api.js';
import ContentLoading from '../../../Commons/ContentLoading/ContentLoading.jsx';
import ModalLayout from 'react-responsive-modal';


class RegisterEmptyFounder extends Component {
    constructor(props) {
        super(props);
        this.dataToSend = {}
        this.state = {
            openModal: false,
            loading: "Registrarme",
            datacities: {},
            fieldsRequired: {
                personal_gender: true,
                personal_names: true,
                personal_lastnames: true,
                personal_dateborn: true,
                personal_email: true,
                personal_username: true,
                number_fds: true,
                state: true,
                city_fds: true,
                active_city: true,
                area: true,
                password: true,
            },
            msgerror: ''
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    async componentDidMount() {
        const datacities = await api.cities.getCitiesList();
        this.setState({
            datacities
        });
    }

    render(){
        if (this.state.datacities.result==='ok'&& this.state.datacities.status>=200 && this.state.datacities.status<=207) {

            return(
                <section>
                    <div>
                        <h2>Registrate como encontrado.</h2>
                        <form onSubmit={this.handleSubmit}>
                        
                            <DataYoung 
                                {...this.state}
                            />
                            <DataFound
                                {...this.state}
                                handleStateChange={this.handleStateChange}
                            />
                            <section className="Main__submit">
                                <button type="submit" 
                                    value="submit" 
                                    className="Main__submit__register button">{this.state.loading}
                                </button>
                            </section>
                        </form>
                    </div>
                    <ModalLayout
                        open={this.state.openModal} 
                        onClose={this.onCloseModal} 
                        center>
                            <span> {this.state.MessageError}</span>
                    </ModalLayout>
                </section>
            );
        } else if (this.state.datacities.result==='error') {
            return(
                <MessageError status={this.state.datacities.status} statusText={this.state.datacities.statusText}/>
                );  
            
        } else {
            return(
                <ContentLoading/>
                );  
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        
        let data = this.prepareDateToSend(event);
        this.setState({
            loading:"Enviando..."
        });
        if (data!=='') {
            const response = await api.founds.postEmptyFounder(data);
            if (response.result=='ok'&& response.status>=200 && response.status<=207) {
                let url = `/resultado/?result=${response.result}&message=${response.statusText}&personal_name=${response.bodyObject.young.user.first_name}&type=registerfound`
                window.location.href = url;
            }else {
                this.setState({
                    open:true,
                    MessageError: response.statusText
                });
            }
            
        }
        this.setState({
            loading:"Registrarme"
        });
        


    }
    
    prepareDateToSend(event){
        this.dataToSend.personal_gender = event.target.elements['personal_gender'].value;
        this.dataToSend.personal_names = event.target.elements['personal_names'].value;
        this.dataToSend.personal_lastnames = event.target.elements['personal_lastnames'].value;
        this.dataToSend.personal_dateborn = event.target.elements['personal_dateborn'].value;
        this.dataToSend.personal_homephone = event.target.elements['personal_homephone'].value;
        this.dataToSend.personal_mobilephone = event.target.elements['personal_mobilephone'].value;
        this.dataToSend.personal_address = event.target.elements['personal_address'].value;
        this.dataToSend.personal_email = event.target.elements['personal_email'].value;
        this.dataToSend.personal_username = event.target.elements['personal_username'].value;
        this.dataToSend.personal_profession = event.target.elements['personal_profession'].value;
        this.dataToSend.personal_occupation = event.target.elements['personal_occupation'].value;
        this.dataToSend.state = event.target.elements['state'].value;
        this.dataToSend.number_fds = event.target.elements['number_fds'].value;
        this.dataToSend.city_fds = event.target.elements['city_fds'].value;
        this.dataToSend.active_city = event.target.elements['active_city'].value;
        this.dataToSend.area = event.target.elements['area'].value;
        this.dataToSend.password = event.target.elements['password'].value;
        this.dataToSend.nameparent = event.target.elements['nameparent'].value;
        let i = 0;
        let fieldsRequired = this.state.fieldsRequired;
        if (this.dataToSend.personal_gender.length===0) {
            fieldsRequired['personal_gender'] = false;
            i++;
        } else {
            fieldsRequired['personal_gender'] = true;
        }
        if (this.dataToSend.personal_names.length===0) {
            fieldsRequired['personal_names'] = false;
            i++;
        }else {
            fieldsRequired['personal_names'] = true;
        }
        if (this.dataToSend.personal_lastnames.length===0) {
            fieldsRequired['personal_lastnames'] = false;
            i++;
        } else {
            fieldsRequired['personal_lastnames'] = true;
        }
        if (this.dataToSend.personal_dateborn.length===0) {
            fieldsRequired['personal_dateborn'] = false;
            i++;
        } else {
            fieldsRequired['personal_dateborn'] = true;
        }
        if (this.dataToSend.personal_email.length===0) {
            fieldsRequired['personal_email'] = false;
            i++;
        } else {
            fieldsRequired['personal_email'] = true;
        }
        if (this.dataToSend.personal_username.length===0) {
            fieldsRequired['personal_username'] = false;
            i++;
        } else {
            fieldsRequired['personal_username'] = true;
        }
        if (this.dataToSend.number_fds.length===0) {
            fieldsRequired['number_fds'] = false;
            i++;
        } else {
            fieldsRequired['number_fds'] = true;
        }
        if (this.dataToSend.city_fds=='0') {
            fieldsRequired['city_fds'] = false;
            i++;
        } else {
            fieldsRequired['city_fds'] = true;
        }
        if (this.dataToSend.active_city=='0') {
            fieldsRequired['active_city'] = false;
            i++;
        } else {
            fieldsRequired['active_city'] = true;
        }
        if (this.dataToSend.area=='0') {
            fieldsRequired['area'] = false;
            i++;
        } else {
            fieldsRequired['area'] = true;
        }
        if (this.dataToSend.password.length===0) {
            fieldsRequired['password'] = false;
            i++;
        } else {
            fieldsRequired['password'] = true;
        }
        if (this.dataToSend.state=='0') {
            fieldsRequired['state'] = false;
            i++;
        } else {
            fieldsRequired['state'] = true;
        }
        if (i>0) {
            this.setState({
                fieldsRequired
            })
            return '';
        }else {
            return this.dataToSend;
        }
    }
    onCloseModal() {
        this.setState({ openModal: false });
    };
}

export default RegisterEmptyFounder;