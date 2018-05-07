import React, {Component} from 'react';

class DataFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <section>
                <h3>Datos como encontrado</h3>
                <div>
                    <label className="Main__dataFound__numberFds"># FDS
                        <input type="text" value={this.props.fds} placeholder="Número de FDS que viviste" 
                                onChange={this.props.handleFdsNumberChange} required/>                        
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__nameParentFds">Nombre de tu Papá / Mamá de FDS
                        <input type="text" value={this.props.nameparent} placeholder="Número de FDS que viviste" 
                                onChange={this.props.handleNameParentChange} />
                    </label>
                </div>
                <div>
                    <label className="Main__dataFound__password">Contraseña
                        <input type="password" value={this.props.password} placeholder="Contraseña" 
                                onChange={this.props.handlePasswordChange} /> 
                    </label>
                </div>
            </section>
        );
    }
}
export default DataFound;