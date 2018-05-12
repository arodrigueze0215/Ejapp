import React, {Component} from 'react';
import DataYoung from '../DataYoung.jsx'
import DataFound from './DataFound.jsx'

class RegisterEmptyFounder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personal_gender:'true',
            personal_names:'',
            personal_lastnames: '',
            personal_dateborn: '',
            personal_homephone: '',
            personal_mobilephone: '',
            personal_address: '',
            personal_email: '',
            personal_username: '',
            personal_profession: '',
            personal_occupation: '',
            state: '',
            number_fds: '',
            city_fds: '0',
            active_city: '0',
            area: '0',
            password: '',
            nameparent: '',
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNamesChange = this.handleNamesChange.bind(this);
        this.handleLastNamesChange = this.handleLastNamesChange.bind(this);
        this.handleDateBornChange = this.handleDateBornChange.bind(this);
        this.handleHomePhoneChange = this.handleHomePhoneChange.bind(this);
        this.handleMobilePhoneChange = this.handleMobilePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleProfessionChange = this.handleProfessionChange.bind(this);
        this.handleOccupationChange = this.handleOccupationChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleFdsNumberChange = this.handleFdsNumberChange.bind(this);
        this.handleNameParentChange = this.handleNameParentChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSelectAreaChange = this.handleSelectAreaChange.bind(this);
        this.handleSelectCityActiveChange = this.handleSelectCityActiveChange.bind(this);
        this.handleSelectCityFdsChange = this.handleSelectCityFdsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleGenderChange (event){
        const value = event.target.value;
        this.setState({
            personal_gender: value,
        });

    }
    handleSelectCityFdsChange(event) {
        this.setState({
            city_fds:event.target.value
        });
    }
    handleSelectCityActiveChange(event) {
        this.setState({
            active_city:event.target.value
        });
    }
    handleSelectAreaChange(event) {
        this.setState({
            area:event.target.value
        });
    }
    handleStateChange(event) {
        this.setState({
            state:event.target.value
        });
    }
    handleOccupationChange(event) {
        this.setState({
            personal_occupation:event.target.value
        });
    }
    handleProfessionChange(event) {
        this.setState({
            personal_profession:event.target.value
        });
    }
    handlePasswordChange(event) {
        this.setState({
            password:event.target.value
        });
    }
    handleNameParentChange(event) {
        this.setState({
            nameparent:event.target.value
        });
    }
    handleFdsNumberChange(event) {
        this.setState({
            number_fds:event.target.value
        });
    }
    handleNamesChange(event) {
        this.setState({
            personal_names:event.target.value
        });
    }
    handleLastNamesChange(event) {
        this.setState({
            personal_lastnames: event.target.value
        });
    }
    handleDateBornChange(event) {
        this.setState({
            personal_dateborn: event.target.value
        });
    }
    handleHomePhoneChange(event) {
        this.setState({
            personal_homephone: event.target.value
        });
    }
    handleMobilePhoneChange(event) {
        this.setState({
            personal_mobilephone: event.target.value
        });
    }
    handleAddressChange(event) {
        this.setState({
            personal_address: event.target.value
        });
    }
    handleEmailChange(event) {
        this.setState({
            personal_email: event.target.value
        });
    }
    handleUserNameChange(event) {
        this.setState({
            personal_username: event.target.value
        });
    }
    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }
    render(){
        const style = {
            display: 'none'
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <h2>Registrate como encontrado.</h2>
            
            <DataYoung 
                {...this.state}
                handleGenderChange={this.handleGenderChange}
                handleNamesChange={this.handleNamesChange}
                handleLastNamesChange={this.handleLastNamesChange}
                handleDateBornChange={this.handleDateBornChange}
                handleHomePhoneChange={this.handleHomePhoneChange}
                handleMobilePhoneChange={this.handleMobilePhoneChange}
                handleAddressChange={this.handleAddressChange}
                handleProfessionChange={this.handleProfessionChange}
                handleOccupationChange={this.handleOccupationChange}
                />
            <DataFound
                {...this.state}
                handleStateChange={this.handleStateChange}
                handleEmailChange={this.handleEmailChange}
                handleUserNameChange={this.handleUserNameChange}
                handleFdsNumberChange={this.handleFdsNumberChange}
                handleNameParentChange={this.handleNameParentChange}
                handlePasswordChange={this.handlePasswordChange}
                handleSelectAreaChange = {this.handleSelectAreaChange}
                handleSelectCityActiveChange = {this.handleSelectCityActiveChange}
                handleSelectCityFdsChange = {this.handleSelectCityFdsChange}
            />
                <section className="Main__submit">
                    <button type="submit" 
                        value="submit" 
                        className="Main__submit__register button">Registrarme
                    </button>
                </section>
            </form>
        );
    }
    
}
export default RegisterEmptyFounder;