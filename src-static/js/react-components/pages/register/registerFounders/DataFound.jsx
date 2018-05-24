import React from 'react';
import SelectAreas from '../../../Commons/SelectAreas/SelectAreas.jsx';
import CityFds from '../../../Commons/SelectCities/SelectFunctionalCities/CityFds.jsx';
import ActiveCity from '../../../Commons/SelectCities/SelectFunctionalCities/ActiveCity.jsx';

function DataFound(props){

    return(
        <section>
            <section>
                <h3>Datos como encontrado</h3>
                <div>
                    <label className="Main__dataFound__state">¿Eres un encontrado activo?
                        <select value={props.state.state} onChange={props.handleStateChange}>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__numberFds"># FDS
                        <input type="tel" value={props.number_fds} placeholder="Número de FDS que viviste" 
                                onChange={props.handleFdsNumberChange} />                        
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__selectFdsCity"> Selecciona la ciudad donde viviste tu FDS
                        <CityFds 
                            {...props} 
                        />
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__selectCityActive"> Selecciona la ciudad donde fue la última vez que estuviste activo o  donde actualmente estas activo
                        <ActiveCity 
                            {...props} 
                        />
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__nameParentFds">Nombre de tu Papá / Mamá de FDS
                        <input type="text" value={props.nameparent} placeholder="Nombre y apellido" 
                                onChange={props.handleNameParentChange} />
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__selectArea"> Selecciona el área al que perteneces.
                        <SelectAreas 
                            {...props} 
                            selectAreas = {props.handleSelectAreaChange}
                        />
                    </label>
                </div>
            </section>
            <section>
            <h3>Datos de registro</h3>

                <div>
                    <label className="Main__dataRegister__username">nickname
                        <input type="text" value={props.username} placeholder="Apodo" 
                                onChange={props.handleUserNameChange} />
                    </label>
                    <label className="Main__dataRegister__email">Correo electrónico
                        <input type="email" value={props.personal_email} placeholder="encontrado@gmail.com" 
                                onChange={props.handleEmailChange} />
                    </label>
                    <label className="Main__dataRegister__password">Contraseña
                        <input type="password" value={props.password} placeholder="Contraseña" 
                                onChange={props.handlePasswordChange} /> 
                    </label>
                </div>
            </section>
        </section>
    );
}
export default DataFound;