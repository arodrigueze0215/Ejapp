import React from 'react';

const HealthToUpdate = (props) =>{
    return(
        <section className="Main__health">
            <h2>Limitaciones de salud</h2>
            <label className="Main__health__illness">¿Sufres de alguna enfermedad que debamos tener en cuenta?
                <input 
                    type="text" 
                    name="illness" 
                    placeholder="Cuéntanos cuales"
                    defaultValue={props.dataInscription.bodyObject.illness}
                />
            </label>
            <label className="Main__health__especialFood">¿Algún alimento que no debas o puedas comer y necesitemos saber?
                <input 
                    type="text" 
                    name="especial_food" 
                    placeholder="Cuéntanos cuales"
                    defaultValue={props.dataInscription.bodyObject.especial_food}
                />
            </label>
            <label className="Main__health__especialMedicine">¿Necesitas algún medicamento especial?
                <input 
                    type="text" 
                    name="special_medicine" 
                    placeholder="Cuéntanos cuales"
                    defaultValue={props.dataInscription.bodyObject.special_medicine}
                />
            </label>
            <label className="Main__health__eps">En caso de emergencia ¿Cuál es tu EPS?
                <input 
                    type="text" 
                    name="eps"
                    placeholder="Cuéntanos cuales"
                    defaultValue={props.dataInscription.bodyObject.eps}
                />
            </label>
        </section>

    );

}

export default HealthToUpdate;