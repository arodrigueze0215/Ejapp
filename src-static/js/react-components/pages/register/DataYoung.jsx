import React, {Component} from 'react';

class DataYoung extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <section className="Main__dataYoung">
                    <h3> Datos personales</h3>
                            <div className="Main__dataYoung__gender">
                                <fieldset className="large-6 columns">
                                    <legend>¿Género?</legend>
                                    <input type="radio" name="gender" value="true" id="gender_male" 
                                            onChange={this.props.handleGenderChange}/>
                                    <label htmlFor="gender_male">Masculino</label>
                                    <input type="radio" name="gender" value="false" id="gender_female"
                                           onChange={this.props.handleGenderChange}/>
                                    <label htmlFor="gender_female">Femenino</label>
                                </fieldset>
                            </div>
                            <div className="Main__dataYoung__names">
                                <label className="Main__dataYoung__names__name">Nombres
                                    <input type="text" value={this.props.names} placeholder="Nombres" 
                                           onChange={this.props.handleNamesChange} required/>
                                    
                                </label>
                                <label className="Main__dataYoung__names__lastName">Apellidos
                                    <input type="text" value={this.props.lastnames} placeholder="Apellidos"
                                           onChange={this.props.handleLastNamesChange} required/>

                                </label>
                                <label className="Main__dataYoung__names__dateBorn">Fecha nacimiento
                                    <input type="date" value={this.props.dateborn} placeholder="2000-02-15" 
                                           onChange={this.props.handleDateBornChange} required/>
                                </label>
                            </div>
                            <div className="Main__dataYoung__contact">
                                <label className="Main__dataYoung__contact__homePhone">Telefono
                                    <input type="text" value={this.props.homephone} placeholder="Nombres"
                                            onChange={this.props.handleHomePhoneChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__mobilePhone">Móvil
                                    <input type="text" value={this.props.mobilephone} placeholder="Número telefónico de tu casa"
                                             onChange={this.props.handleMobilePhoneChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__address">Dirección
                                    <input type="text" value={this.props.address} placeholder="Dirección de residencia"
                                           onChange={this.props.handleAddressChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__email">Correo electrónico
                                    <input type="email" value={this.props.email} placeholder="encontrado@gmail.com" 
                                            onChange={this.props.handleEmailChange} required/>
                                </label>
                                <label className="Main__dataYoung__contact__username">nickname
                                    <input type="text" value={this.props.username} placeholder="Apodo" 
                                            onChange={this.props.handleUserNameChange} required/>
                                </label>
                            </div>
                </section>
        );
    }
}
export default DataYoung;