import React from 'react';

const DataBrothersToUpdate = (props) => {
    console.log('dataBrothers', props.dataBrothers);
    const {bodyObject} =props.dataBrothers.object;
    const tr = bodyObject.map(brother => {
        return(
            <tr key={brother.id}>
                <td>{brother.name_brother}</td>
                {brother.date_born.length>0?(<td>{brother.date_born}</td>):(<td>No tiene</td>)}
                {brother.mobile_phone.length>0?(<td>{brother.mobile_phone}</td>):(<td>No tiene</td>)}
                {brother.email.length>0?(<td>{brother.email}</td>):(<td>No tiene</td>)}
                <td>{brother.relationship}</td>
                {brother.isalive?(<td>Sí</td>):(<td>No</td>)}
            </tr>
        )
    })
    

    return(
        <section className="Main__family__brothers">
            <div>
                <h4> Datos de tus hermanos (as) /Primos (as)</h4>
                <div className="callout warning">
                    <h5>Importante!!</h5>
                    <p>Si tienes hermanos (as) /Primos (as) debes agregar uno a uno, llenando su información y luego presionando el botón "Agregar". A medida que agregas hermanos aparecerá sus datos en la parte inferior "Lista de hermanos" .</p>
                    <p>En caso de que no tengas hermanos simplemente pasa a la sección siguiente.</p>
                    <p></p>
                </div>
                <div className="Main__family__brothers__data">
                    <label className="Main__family__brothers__data__names">Nombre completo
                        <input 
                            type="text" 
                            name="data-brothers-names" 
                            placeholder="Nombres y apellidos"/>
                    </label>
                    <label className="Main__family__brothers__data__date">Fecha de nacimiento
                        <input 
                            type="date" 
                            name="data-brothers-date" 
                            placeholder="2000-02-15"/>
                    </label>
                    <label className="Main__family__brothers__data__phone">Telefono móvil
                        <input type="tel" name="data-brothers-phone" placeholder="# celular"/>
                    </label>
                    <label className="Main__family__brothers__data__email">Correo electrónico
                        <input type="email" name="data-brothers-email" placeholder="Correo"/>
                    </label>
                    <select name="relation" className="Main__family__brothers__data__relations">
                            <option value="1">Hermano</option>
                            <option value="2">Hermana</option>
                            <option value="3">Primo</option>
                            <option value="4">Prima</option>
                    </select>
                    <button  id="brothersDataSave" type="button" className="Main__family__brothers__data__save button">Agregar</button>
                </div>
                <div className="Main__family__brothers__table">
                    <h5> Lista de hermanos</h5>
                    <table id="listBroders" className="table-scroll">
                        <thead>
                            <tr>
                                <th>nombres</th>
                                <th>Fecha nacimiento</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Relación</th>
                                <th>Vivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tr}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
export default DataBrothersToUpdate;