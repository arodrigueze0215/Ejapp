
import React from 'react';

const DataYoungToUpdate = (props) => {
    const styleRequired = {
        color: 'red'
    }
    return (
        <section className="Main__DataYoungToUpdate">
            <h3> Datos personales</h3>
            <div className="Main__DataYoungToUpdate__gender">
                <fieldset className="large-6 columns">
                    <legend 
                        style={!props.fieldsRequired['personal_gender']? styleRequired:{}}>
                        ¿Género? {!props.fieldsRequired['personal_gender']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    </legend>
                    <input 
                        type="radio" 
                        name="personal_gender" 
                        value="true"
                        id="gender_male" 
                    />
                    <label htmlFor="gender_male">Masculino</label>
                    <input 
                        type="radio" 
                        name="personal_gender" 
                        value="false" 
                        id="gender_female"
                    />
                    <label htmlFor="gender_female">Femenino</label>
                </fieldset>
                <div className="Main__DataYoungToUpdate__names">
                    <label 
                        className="Main__DataYoungToUpdate__names__name" 
                        style={!props.fieldsRequired['personal_names']? styleRequired:{}}>
                        Nombres{!props.fieldsRequired['personal_names']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                        <input 
                            type="text" 
                            placeholder="Nombres" 
                            name="personal_names"
                        />
                    </label>

                    <label 
                        className="Main__DataYoungToUpdate__names__lastName"
                        style={!props.fieldsRequired['personal_lastnames']? styleRequired:{}}>
                        Apellidos {!props.fieldsRequired['personal_lastnames']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                        <input 
                            type="text" 
                            placeholder="Apellidos" 
                            name="personal_lastnames" 
                        />

                    </label>
                    <label 
                        className="Main__dataRegister__email"
                        style={!props.fieldsRequired['personal_email']? styleRequired:{}}>
                        Correo electrónico
                        {!props.fieldsRequired['personal_email']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                            <input
                                type="email" 
                                placeholder="encontrado@gmail.com" 
                                name="personal_email"
                            />
                    </label>
                    <label 
                        className="Main__DataYoungToUpdate__names__dateBorn"
                        style={!props.fieldsRequired['personal_dateborn']? styleRequired:{}}>
                        Fecha nacimiento {!props.fieldsRequired['personal_dateborn']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                        <input 
                            type="date" 
                            placeholder="2000-02-15" 
                            name="personal_dateborn"
                         />
                    </label>
                </div>
            </div>
        </section>
    );
}

export default DataYoungToUpdate;