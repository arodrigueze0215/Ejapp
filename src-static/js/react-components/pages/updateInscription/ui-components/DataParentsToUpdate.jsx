import React from 'react';

const DataParentsToUpdate = (props) => {
    return(
        <section className="Main__family">
            <h2> Datos Familiares</h2>
            <div className="Main__family__dad">
                <h4> Datos de tu papá</h4>
                <div className="Main__family__dad__question">
                    <fieldset className="large-6 columns">
                        <legend>¿Aún vive?</legend>
                        <input type="radio" name="dad" value="true" id="dad_yes" required/>
                        <label htmlFor="dad_yes">Sí</label>
                        <input type="radio" name="dad" value="false" id="dad_no"/>
                        <label htmlFor="dad_no">No</label>
                    </fieldset>                        
                </div>
                <div className="Main__family__dad__data__one">
                    <label className="Main__family__dad__data__one__names">Nombre completo
                        <input type="text" name="dad_names" placeholder="Nombres y apellidos" required/>
                    </label>
                    <label className="Main__family__dad__data__one__ocupation">Ocupación
                        <input type="text" name="dad_ocupation" placeholder="A que se dedica tu papá"/>
                    </label>
                </div>
                <div className="Main__family__dad__data__two">
                    <label className="Main__family__dad__data__two__phoneHome">Teléfono
                        <input type="tel" name="dad_phone_home" placeholder="# telefono de la casa"/>
                    </label>
                    <label className="Main__family__dad__data__two__phone">Teléfono celular
                        <input type="tel" name="dad_phone" placeholder="# telefono celular"/>
                    </label>
                    <label className="Main__family__dad__data__two__address">Dirección
                        <input type="text" name="dad_address" placeholder="Dirección donde vive tu papá"/>
                    </label>
                </div>
            </div>
            <div className="Main__family__mom">
                <h4> Datos de tu mamá</h4>
                <div className="Main__family__mom__question">
                    <fieldset className="large-6 columns">
                        <legend>¿Aún vive?</legend>
                        <input type="radio" name="mom" value="true" id="mom_yes" required/>
                        <label htmlFor="mom_yes">Sí</label>
                        <input type="radio" name="mom" value="false" id="mom_no"/>
                        <label htmlFor="mom_no">No</label>
                    </fieldset>                        
                </div>
                <div className="Main__family__mom__data__one">
                    <label className="Main__family__mom__data__one__names">Nombre completo
                        <input type="text" name="mom_names" placeholder="Nombres y apellidos" required/>
                    </label>
                    <label className="Main__family__mom__data__one__ocupation">Ocupación
                        <input type="text" name="mom_ocupation" placeholder="A que se dedica tu mamá"/>
                    </label>
                </div>
                <div className="Main__family__mom__data__two">
                    <label className="Main__family__mom__data__two__phoneHome">Teléfono
                        <input type="tel" name="mom_phone_home" placeholder="# telefono de la casa"/>
                    </label>
                    <label className="Main__family__mom__data__two__phone">Teléfono celular
                        <input type="tel" name="mom_phone" placeholder="# telefono celular"/>
                    </label>
                    <label className="Main__family__mom__data__two__address">Dirección
                        <input type="text" name="mom_address" placeholder="Dirección donde vive tu mamá"/>
                    </label>
                </div>
            </div>
        </section>
    );
}
export default DataParentsToUpdate;