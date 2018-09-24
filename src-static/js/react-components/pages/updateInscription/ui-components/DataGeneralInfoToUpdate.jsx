import React from 'react';

const GeneralInfo = (props) =>{
    const styleRequired = {
        color: 'red'
    }
    return(
        <section className="Main__generalInfo">
            <h2>Datos generales</h2>
            <div className="Main__generalInfo__data__one">
                <label 
                    className="Main__generalInfo__data__one__whoIntiveMe" 
                    style={!props.fieldsRequired['who_intive_me']? styleRequired:{}}>
                    ¿Quien te invitó al EJ? {!props.fieldsRequired['who_intive_me']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="text" 
                        name="who_intive_me"
                        placeholder="Nombre y apellido" 
                        defaultValue={props.dataInscription.bodyObject.who_invite_me}
                    />
                </label>
                <label 
                    className="Main__generalInfo__data__one__whoIntiveMeNumber"
                    style={!props.fieldsRequired['who_intive_me_number']? styleRequired:{}}>
                    Teléfono móvil {!props.fieldsRequired['who_intive_me_number']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="tel" 
                        name="who_intive_me_number" 
                        placeholder="# de celular de quien te invitó" 
                        defaultValue={props.dataInscription.bodyObject.who_invite_me_number}
                    />
                </label>
            </div>
            <div className="Main__generalInfo__data__two">
                <label 
                    className="Main__generalInfo__data__two__whyFds"
                    style={!props.fieldsRequired['why_fds']? styleRequired:{}}>
                    ¿Por que quieres vivir FDS? {!props.fieldsRequired['why_fds']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="text" 
                        name="why_fds"
                        placeholder="Dejanos saber tu interes"
                        defaultValue={props.dataInscription.bodyObject.why_fds}
                    />
                </label>
            </div>
            <div className="Main__generalInfo__data__three">
                <h4 style={!props.fieldsRequired['other_experiences']? styleRequired:{}}>
                    Aparte de vivir el fin de semana, ¿Te interesa pertenecer al encuentro juvenil Pereira?
                    {!props.fieldsRequired['other_experiences']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                </h4>
                <input 
                    type="radio" 
                    name="want_fds" 
                    value="true" 
                    id="wantFds_yes"
                    defaultChecked={props.dataInscription.bodyObject.do_you_want_ej} 
                    required
                />
                <label htmlFor="wantFds_yes">Sí</label>
                <input 
                    type="radio" 
                    name="want_fds" 
                    value="false" 
                    id="wantFds_no"
                    defaultChecked={!props.dataInscription.bodyObject.do_you_want_ej} 
                />
                <label htmlFor="wantFds_no">No</label>
            </div>
            <div className="Main__generalInfo__data__four">
                <h4 style={!props.fieldsRequired['other_experiences']? styleRequired:{}}>
                    ¿Has participado de alguna actividad de crecimiento personal, grupo o movimiento juvenil?
                    {!props.fieldsRequired['other_experiences']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                </h4>
                <input 
                    type="radio" 
                    name="other_experiences" 
                    value={true}
                    id="otherExperiences_yes"
                    onChange={props.enableFields}
                    defaultChecked={props.dataInscription.bodyObject.other_experiences} 
                />
                <label htmlFor="otherExperiences_yes">Sí</label>

                <input 
                    type="radio" 
                    name="other_experiences" 
                    value={false} 
                    id="otherExperiences_no"
                    onChange={props.enableFields}
                    required
                    defaultChecked={!props.dataInscription.bodyObject.other_experiences} 
                    
                />
                <label htmlFor="otherExperiences_no">No</label>

                <label className="Main__generalInfo__data__four__otherExperiences">Cuentanos ¿Cual?
                    <input 
                        type="text" 
                        name="other_experiences_which" 
                        disabled={props.disableExperiencesWhichFields}
                        defaultValue={props.dataInscription.bodyObject.experiences_which} 
                    />
                </label>
            </div>
        </section>
    );

}

export default GeneralInfo;