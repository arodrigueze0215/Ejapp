import React from 'react';

const MostImportant = (props) =>{

    return(
        <section>
            <h4>La persona mas importante en tu vida.</h4>
            <div className="Main__family__mostImportant">
                <label className="Main__family__mostImportant__name">¿Quién es la persona mas importante en tu vida?
                    <input type="text" name="person_mostimportant_name" placeholder="Nombre y apellido" required/>
                </label>
                <label className="Main__family__mostImportant__number">Indicanos su número telefónico de contacto.
                    <input type="tel" name="person_mostimportant_number" placeholder="Número telefónico" required/>
                </label>
            </div>
        </section>
    );

}

export default MostImportant;