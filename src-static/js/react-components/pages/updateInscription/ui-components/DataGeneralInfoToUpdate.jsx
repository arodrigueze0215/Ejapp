import React from 'react';

const GeneralInfo = (props) =>{
    console.log(props.dataInscription.bodyObject)
    return(
        <section className="Main__generalInfo">
            <h2>Datos generales</h2>
            <div className="Main__generalInfo__data__one">
                <label className="Main__generalInfo__data__one__whoIntiveMe">¿Quien te invitó al EJ?
                    <input 
                        type="text" 
                        name="whoIntiveMe"
                        placeholder="Nombre y apellido" 
                        required
                        defaultValue={props.dataInscription.bodyObject.who_invite_me}
                    />
                </label>
                <label className="Main__generalInfo__data__one__whoIntiveMeNumber">Teléfono móvil
                    <input 
                        type="tel" 
                        name="whoIntiveMeNumber" 
                        placeholder="# de celular de quien te invitó" 
                        required
                        defaultValue={props.dataInscription.bodyObject.who_invite_me_number}
                    />
                </label>
            </div>
            <div className="Main__generalInfo__data__two">
                <label className="Main__generalInfo__data__two__whyFds">¿Por que quieres vivir FDS?
                    <input 
                        type="text" 
                        name="whyFds"
                        placeholder="Dejanos saber tu interes"
                        defaultValue={props.dataInscription.bodyObject.why_fds}
                    />
                </label>
            </div>
            <div className="Main__generalInfo__data__three">
                <h4>Aparte de vivir el fin de semana, ¿Te interesa pertenecer al encuentro juvenil Pereira?</h4>
                <input 
                    type="radio" 
                    name="wantFds" 
                    value="true" 
                    id="wantFds_yes"
                    defaultChecked={props.dataInscription.bodyObject.other_experiences} 
                    required
                />
                <label htmlFor="wantFds_yes">Sí</label>
                <input 
                    type="radio" 
                    name="wantFds" 
                    value="false" 
                    id="wantFds_no"
                    defaultChecked={!props.dataInscription.bodyObject.other_experiences} 
                />
                <label htmlFor="wantFds_no">No</label>
            </div>
            <div className="Main__generalInfo__data__four">
                <h4>¿Has participado de alguna actividad de crecimiento personal, grupo o movimiento juvenil?</h4>
                <input 
                    type="radio" 
                    name="otherExperiences" 
                    value="true" 
                    id="otherExperiences_yes"
                    defaultChecked={props.dataInscription.bodyObject.do_you_want_ej} 
                />
                <label htmlFor="otherExperiences_yes">Sí</label>
                <input 
                    type="radio" 
                    name="otherExperiences" 
                    value="false" 
                    id="otherExperiences_no"
                    required
                    defaultChecked={!props.dataInscription.bodyObject.do_you_want_ej} 
                />
                <label htmlFor="otherExperiences_no">No</label>
                <label className="Main__generalInfo__data__four__otherExperiences">Cuentanos ¿Cual?
                    <input 
                        type="text" 
                        name="otherExperiences-which" 
                        disabled
                        defaultValue={props.dataInscription.bodyObject.experiences_which} 
                    />
                </label>
            </div>
        </section>
    );

}

export default GeneralInfo;