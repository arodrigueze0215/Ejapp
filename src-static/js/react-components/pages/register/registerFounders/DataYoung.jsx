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
                                    <legend 
                                        style={!this.props.fieldsRequired['personal_gender']? styleRequired:{}}>
                                        ¿Género? {!this.props.fieldsRequired['personal_gender']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                                    </legend>
                                    <input type="radio" name="personal_gender" value="true" id="gender_male" />
                                    <label htmlFor="gender_male">Masculino</label>
                                    <input type="radio" name="personal_gender" value="false" id="gender_female"/>
                                    <label htmlFor="gender_female">Femenino</label>
                                </fieldset>
                            </div>
                            <div className="Main__dataYoung__names">
                                
                                <label className="Main__dataYoung__names__name" 
                                        style={!this.props.fieldsRequired['personal_names']? styleRequired:{}}>
                                        Nombres{!this.props.fieldsRequired['personal_names']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                                    <input type="text" placeholder="Nombres" name="personal_names"/>
                                </label>

                                <label className="Main__dataYoung__names__lastName"
                                        style={!this.props.fieldsRequired['personal_lastnames']? styleRequired:{}}>
                                    Apellidos {!this.props.fieldsRequired['personal_lastnames']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                                    <input type="text" placeholder="Apellidos" name="personal_lastnames" />

                                </label>
                                <label 
                                    className="Main__dataYoung__names__dateBorn"
                                    style={!this.props.fieldsRequired['personal_dateborn']? styleRequired:{}}>
                                    Fecha nacimiento {!this.props.fieldsRequired['personal_dateborn']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                                    <input type="date" placeholder="2000-02-15" name="personal_dateborn" />
                                </label>
                            </div>
                            <div className="Main__dataYoung__contact">
                                <label className="Main__dataYoung__contact__homePhone">Telefono
                                    <input type="tel" placeholder="Nombres" name="personal_homephone"/>
                                </label>
                                <label className="Main__dataYoung__contact__mobilePhone">Móvil
                                    <input type="tel" placeholder="Número telefónico de tu casa" name="personal_mobilephone"/>
                                </label>
                                <label className="Main__dataYoung__contact__address">Dirección
                                    <input type="text" placeholder="Dirección de residencia" name="personal_address"/>
                                </label>
                                <label className="Main__dataYoung__contact__profession">Profesión
                                    <input type="text" placeholder="Profesión" name="personal_profession"/>
                                </label>
                                <label className="Main__dataYoung__contact__occupation">Ocupación
                                    <input type="text" placeholder="Ocupación" name="personal_occupation"/>
                                </label>
                            </div>
                </section>
        );
    }
}
export default DataYoung;