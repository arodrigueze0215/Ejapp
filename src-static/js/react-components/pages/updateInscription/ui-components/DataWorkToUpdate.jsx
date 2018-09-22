import React from 'react';

const DataWorkToUpdate = (props) => {

    return(
        <section className="Main__work">
            <h2> Datos Laborares</h2>
            <div className="Main__work__question">
                <fieldset className="large-6 columns">
                    <legend>¿Trabajas?</legend>
                    <input 
                        type="radio"
                        name="do_you_work" 
                        value={true}
                        id="work_yes"
                        defaultChecked={props.dataInscription.bodyObject.do_you_work}
                        onChange={props.enableFields}
                    />
                    <label htmlFor="work_yes">Sí</label>
                    <input 
                        type="radio"
                        name="do_you_work" 
                        value={false}
                        id="work_no"
                        defaultChecked={!props.dataInscription.bodyObject.do_you_work}
                        onChange={props.enableFields}
                    />
                    <label htmlFor="work_no">No</label>
                </fieldset>

            </div>
            <div className="Main__work__data">
                <label className="Main__work__data__company">Empresa
                    <input 
                        type="text"
                        name="work_company" 
                        placeholder="¿Nombre de la empresa o compañía?"
                        defaultValue={props.dataInscription.bodyObject.company}
                        disabled={props.enableWorkFields}
                    />
                </label>
                <label className="Main__work__data__role">Cargo
                    <input 
                        type="text"
                        name="work_role" 
                        placeholder="Cargo que desenpeñas"
                        defaultValue={props.dataInscription.bodyObject.position_job}
                        disabled={props.enableWorkFields}
                    />
                </label>
                <label className="Main__work__data__phone">Teléfono
                    <input 
                        type="tel"
                        name="work_phone" 
                        placeholder="Teléfono donde trabajas"
                        defaultValue={props.dataInscription.bodyObject.phone_company}
                        disabled={props.enableWorkFields}
                    />
                </label>
            </div>
        </section>
    );
}

export default DataWorkToUpdate;