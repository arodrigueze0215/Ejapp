import React, {Component} from 'react';

class DataYoung extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const styleRequired = {
            color: 'red'
        }
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
                                
                                    <label className="Main__dataYoung__names__name" style={!this.props.fieldsRequired.names? styleRequired:{}}>Nombres{!this.props.fieldsRequired.names? " (ESTE CAMPO ES OBLIGATORIO)":""}
                                        <input type="text" value={this.props.personal_names} placeholder="Nombres" 
                                            onChange={this.props.handleNamesChange}/>
                                    </label>

                                <label className="Main__dataYoung__names__lastName">Apellidos
                                    <input type="text" value={this.props.personal_lastnames} placeholder="Apellidos"
                                           onChange={this.props.handleLastNamesChange} />

                                </label>
                                <label className="Main__dataYoung__names__dateBorn">Fecha nacimiento
                                    <input type="date" value={this.props.personal_dateborn} placeholder="2000-02-15" 
                                           onChange={this.props.handleDateBornChange} />
                                </label>
                            </div>
                            <div className="Main__dataYoung__contact">
                                <label className="Main__dataYoung__contact__homePhone">Telefono
                                    <input type="tel" value={this.props.personal_homephone} placeholder="Nombres"
                                            onChange={this.props.handleHomePhoneChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__mobilePhone">Móvil
                                    <input type="tel" value={this.props.personal_mobilephone} placeholder="Número telefónico de tu casa"
                                             onChange={this.props.handleMobilePhoneChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__address">Dirección
                                    <input type="text" value={this.props.personal_address} placeholder="Dirección de residencia"
                                           onChange={this.props.handleAddressChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__profession">Profesión
                                    <input type="text" placeholder="Profesión" value={this.props.personal_profession}
                                        onChange={this.props.handleProfessionChange}/>
                                </label>
                                <label className="Main__dataYoung__contact__occupation">Ocupación
                                    <input type="text" placeholder="Ocupación" value={this.props.personal_occupation}
                                        onChange={this.props.handleOccupationChange}/>
                                </label>
                            </div>
                </section>
        );
    }
}
export default DataYoung;