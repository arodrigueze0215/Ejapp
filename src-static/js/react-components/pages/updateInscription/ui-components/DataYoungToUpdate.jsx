
import React from 'react';

const DataYoungToUpdate = (props) => {
    const styleRequired = {
        color: 'red'
    }
    return (
        <section className="Main__personal">
            <h3> Datos personales</h3>
            <div className="Main__personal__gender">
                <fieldset className="large-6 columns">
                    <legend 
                        style={!props.fieldsRequired['personal_gender']? styleRequired:{}}>
                        ¿Género? {!props.fieldsRequired['personal_gender']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    </legend>
                    <input 
                        type="radio" 
                        name="personal_gender" 
                        value={1}
                        defaultChecked={props.dataInscription.bodyObject.young.gender=='MASCULINO'? true: false}
                        id="gender_male" 
                    />
                    <label htmlFor="gender_male">Masculino</label>
                    <input 
                        type="radio" 
                        name="personal_gender" 
                        value={2}
                        defaultChecked={props.dataInscription.bodyObject.young.gender=='FEMENINO'? true: false}
                        id="gender_female"
                    />
                    <label htmlFor="gender_female">Femenino</label>
                </fieldset>
            </div>
            <div className="Main__personal__names">
                <label 
                    className="Main__personal__names__name" 
                    style={!props.fieldsRequired['personal_names']? styleRequired:{}}>
                    Nombres{!props.fieldsRequired['personal_names']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="text" 
                        placeholder="Nombres" 
                        name="personal_names"
                        defaultValue={props.dataInscription.bodyObject.young.user.first_name}
                    />
                </label>
            
                <label 
                    className="Main__personal__names__lastName"
                    style={!props.fieldsRequired['personal_lastnames']? styleRequired:{}}>
                    Apellidos {!props.fieldsRequired['personal_lastnames']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="text" 
                        placeholder="Apellidos" 
                        name="personal_lastnames"
                        defaultValue={props.dataInscription.bodyObject.young.user.last_name} 
                    />
            
                </label>
                <label 
                    className="Main__personal__names__dateBorn"
                    style={!props.fieldsRequired['personal_dateborn']? styleRequired:{}}>
                    Fecha nacimiento {!props.fieldsRequired['personal_dateborn']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="date" 
                        placeholder="2000-02-15" 
                        name="personal_dateborn"
                        defaultValue={props.dataInscription.bodyObject.young.date_born} 
                        />
                </label>
            </div>
            <div className="Main__personal__numbers">
                <label className="Main__personal__numbers__homePhone">Teléfono
                    <input 
                        type="tel" 
                        name="personal_homephone" 
                        placeholder="Número telefónico de tu casa"
                        defaultValue={props.dataInscription.bodyObject.young.home_phone} 
                    />
                </label>
                <label className="Main__personal__numbers__mobilePhone">Móvil
                    <input 
                        type="tel" 
                        name="personal_mobilephone" 
                        placeholder="Número telefónico personal"
                        defaultValue={props.dataInscription.bodyObject.young.mobile_phone} 
                    />
                </label>
                <label 
                    className="Main__personal__numbers__address">
                    Dirección
                        <input
                            type="text" 
                            name="personal_address" 
                            placeholder="Dirección de residencia"
                            defaultValue={props.dataInscription.bodyObject.young.address}
                        />
                </label>
            </div>
            <div className="Main__personal__addresses">
                <label 
                    className="Main__personal__numbers__email"
                    style={!props.fieldsRequired['personal_email']? styleRequired:{}}>
                    Correo electrónico
                    {!props.fieldsRequired['personal_email']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                        <input
                            type="email" 
                            placeholder="encontrado@gmail.com" 
                            name="personal_email"
                            defaultValue={props.dataInscription.bodyObject.young.user.email}
                        />
                </label>
                <label className="Main__personal__addresses__profesion">Profesión
                    <input 
                        type="text" 
                        name="personal_profession" 
                        placeholder="Profesión"
                        defaultValue={props.dataInscription.bodyObject.young.profession}
                    />
                </label>
                <label className="Main__personal__addresses__occupation">Ocupación
                    <input 
                        type="text" 
                        name="personal_occupation" 
                        placeholder="Ocupación"
                        defaultValue={props.dataInscription.bodyObject.young.occupation}
                    />
                </label>
            </div>
        </section>
    );
}

export default DataYoungToUpdate;