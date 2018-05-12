import React, {Component} from 'react';
import SelectAreas from '../../../Commons/SelectAreas/SelectAreas.jsx';
import SelectCities from '../../../Commons/SelectCities/SelectCities.jsx';

class DataFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <section>

                <section>
                    <h3>Datos como encontrado</h3>
                    <div>
                        <label className="Main__dataFound__state">¿Eres un encontrado activo?
                            <select value={this.props.state.state} onChange={this.props.handleStateChange}>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="Main__dataFound__numberFds"># FDS
                            <input type="tel" value={this.props.number_fds} placeholder="Número de FDS que viviste" 
                                    onChange={this.props.handleFdsNumberChange} required/>                        
                        </label>
                    </div>
                    <div>
                        <label className="Main__dataFound__selectFdsCity"> Selecciona la ciudad donde viviste tu FDS
                            <SelectCities 
                                {...this.props} 
                                selectCityFds = {this.props.handleSelectCityFdsChange} 
                                typeSelect = '1'
                            />
                        </label>
                    </div>
                    <div>
                        <label className="Main__dataFound__selectCityActive"> Selecciona la ciudad donde fue la última vez que estuviste activo o  donde actualmente estas activo
                            <SelectCities 
                                {...this.props} 
                                selectCityActive = {this.props.handleSelectCityActiveChange} 
                                typeSelect= '2'
                            />
                        </label>
                    </div>
                    <div>
                        <label className="Main__dataFound__nameParentFds">Nombre de tu Papá / Mamá de FDS
                            <input type="text" value={this.props.nameparent} placeholder="Nombre y apellido" 
                                    onChange={this.props.handleNameParentChange} />
                        </label>
                    </div>
                    <div>
                        <label className="Main__dataFound__selectArea"> Selecciona el área al que perteneces.
                            <SelectAreas 
                                {...this.props} 
                                selectAreas = {this.props.handleSelectAreaChange}
                            />
                        </label>
                    </div>
                </section>
                <section>
                <h3>Datos de registro</h3>

                    <div>
                        <label className="Main__dataRegister__username">nickname
                            <input type="text" value={this.props.username} placeholder="Apodo" 
                                    onChange={this.props.handleUserNameChange} required/>
                        </label>
                        <label className="Main__dataRegister__email">Correo electrónico
                            <input type="email" value={this.props.personal_email} placeholder="encontrado@gmail.com" 
                                    onChange={this.props.handleEmailChange} required/>
                        </label>
                        <label className="Main__dataRegister__password">Contraseña
                            <input type="password" value={this.props.password} placeholder="Contraseña" 
                                    onChange={this.props.handlePasswordChange} /> 
                        </label>
                    </div>
                </section>
            </section>
        );
    }
}
export default DataFound;