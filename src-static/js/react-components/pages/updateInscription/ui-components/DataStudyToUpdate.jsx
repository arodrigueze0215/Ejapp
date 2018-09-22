import React from 'react';

const DataStudyToUpdate = (props) => {
    
    return(
        <section>
            <h3> Datos Universitarios</h3>
            <div className="Main__personal__study">
                <fieldset className="large-6 columns">
                    <legend>
                        ¿Estudias?
                    </legend>
                    <input 
                        type="radio" 
                        name="do_you_study" 
                        id="study_yes" 
                        value={true}
                        defaultChecked={props.dataInscription.bodyObject.do_you_study}
                        onChange={props.enableFields}
                        />
                    <label htmlFor="study_yes">Sí</label>
                    <input 
                        type="radio" 
                        name="do_you_study" 
                        id="study_no" 
                        value={false}
                        defaultChecked={!props.dataInscription.bodyObject.do_you_study}
                        onChange={props.enableFields}
                    />
                    <label htmlFor="study_no">No</label>
                </fieldset>
            </div>
            <div className="Main__university__data">
                    <label className="Main__university__data__carrer">Carrera
                        <input 
                            type="text" 
                            name="study_carrer" 
                            placeholder="¿Que carrera estudias?"
                            defaultValue={props.dataInscription.bodyObject.carrer}
                            disabled={props.enableStudyFields}
                        />
                    </label>
                    <label className="Main__university__data__whereStudy">Institución
                        <input 
                            type="text" 
                            name="study_where" 
                            placeholder="Nombre de (Universidad, Instituto, etc)"
                            defaultValue={props.dataInscription.bodyObject.school}
                            disabled={props.enableStudyFields}
                        />
                    </label>
                </div>
        </section>

    );
}
export default DataStudyToUpdate;