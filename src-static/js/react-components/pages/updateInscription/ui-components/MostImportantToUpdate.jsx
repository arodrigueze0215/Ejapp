import React from 'react';

const MostImportant = (props) =>{
    const styleRequired = {
        color: 'red'
    }
    return(
        <section>
            <h4>La persona mas importante en tu vida.</h4>
            <div className="Main__family__mostImportant">
                <label 
                    className="Main__family__mostImportant__name"
                    style={!props.fieldsRequired['most_important_name']? styleRequired:{}}>
                    ¿Quién es la persona mas importante en tu vida? {!props.fieldsRequired['most_important_name']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input 
                        type="text" 
                        name="person_mostimportant_name" 
                        placeholder="Nombre y apellido" 
                        defaultValue= {props.dataInscription.bodyObject.person_mostimportant_name}
                    />
                </label>
                <label 
                    className="Main__family__mostImportant__number"
                    style={!props.fieldsRequired['most_important_number']? styleRequired:{}}>
                    Indicanos su número telefónico de contacto. {!props.fieldsRequired['most_important_number']? " (ESTE CAMPO ES OBLIGATORIO)":""}
                    <input
                        type="tel" 
                        name="person_mostimportant_number" 
                        placeholder="Número telefónico" 
                        defaultValue= {props.dataInscription.bodyObject.person_mostimportant_number}
                        />
                </label>
            </div>
        </section>
    );

}

export default MostImportant;