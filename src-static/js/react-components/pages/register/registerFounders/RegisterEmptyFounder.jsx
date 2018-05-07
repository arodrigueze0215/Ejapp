import React, {Component} from 'react';
import DataYoung from '../DataYoung.jsx'
import DataFound from './DataFound.jsx'

class RegisterEmptyFounder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender:'true',
            names:'',
            lastnames: '',
            dateborn: '',
            homephone: '',
            mobilephone: '',
            address: '',
            email: '',
            username: '',
            fds: '',
            nameparent: '',
            password: ''
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNamesChange = this.handleNamesChange.bind(this);
        this.handleLastNamesChange = this.handleLastNamesChange.bind(this);
        this.handleDateBornChange = this.handleDateBornChange.bind(this);
        this.handleHomePhoneChange = this.handleHomePhoneChange.bind(this);
        this.handleMobilePhoneChange = this.handleMobilePhoneChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleFdsNumberChange = this.handleFdsNumberChange.bind(this);
        this.handleNameParentChange = this.handleNameParentChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleGenderChange (event){
        const value = event.target.value;
        this.setState({
            gender: value,
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
            fds:event.target.value
        });
    }
    handleNamesChange(event) {
        this.setState({
            names:event.target.value
        });
    }
    handleLastNamesChange(event) {
        this.setState({
            lastnames: event.target.value
        });
    }
    handleDateBornChange(event) {
        this.setState({
            dateborn: event.target.value
        });
    }
    handleHomePhoneChange(event) {
        this.setState({
            homephone: event.target.value
        });
    }
    handleMobilePhoneChange(event) {
        this.setState({
            mobilephone: event.target.value
        });
    }
    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        });
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }
    handleUserNameChange(event) {
        this.setState({
            username: event.target.value
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
                handleEmailChange={this.handleEmailChange}
                handleUserNameChange={this.handleUserNameChange}
                />
            <DataFound
                {...this.state}
                handleFdsNumberChange={this.handleFdsNumberChange}
                handleNameParentChange={this.handleNameParentChange}
                handlePasswordChange={this.handlePasswordChange}
            />
                <section className="Main__submit">
                    <button type="submit" value="submit" className="Main__submit__register button">Registrarme</button>
                </section>
            </form>
        );
    }
    
}
export default RegisterEmptyFounder;