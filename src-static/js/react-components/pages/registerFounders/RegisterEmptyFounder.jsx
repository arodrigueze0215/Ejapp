import React, {Component} from 'react';

class RegisterEmptyFounder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataYoung: {
                gender:true,
                names:'',
                lastnames: '',
                dateborn: ''
            }
        }
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }
    handleGenderChange (event){
        const value = event.target.value;
        this.setState({
            dataYoung:{
                gender: value
            }
        });

    }
    render(){
        return(
            <section className="Main__dataYoung">
                <h2> Datos personales</h2>
                        <div className="Main__dataYoung__gender">
                            <fieldset className="large-6 columns">
                                <legend>¿Género?</legend>
                                <input type="radio" name="gender" value="true" id="gender_male" 
                                        onChange={this.handleGenderChange}/>
                                <label htmlFor="gender_male">Masculino</label>
                                <input type="radio" name="gender" value="false" id="gender_female"
                                        onChange={this.handleGenderChange}/>
                                <label htmlFor="gender_female">Femenino</label>
                            </fieldset>
                        </div>
                        <div className="Main__personal__names">
                            <label className="Main__personal__names__name">Nombres
                                <input type="text" name="personal_names" placeholder="Nombres"/>
                                <span className="form-error">
                                    Hace falta tus nombres.
                                </span>
                            </label>
                            <label className="Main__personal__names__lastName">Apellidos
                                <input type="text" name="personal_lastnames" placeholder="Apellidos"/>
                                <span className="form-error">
                                    Hace falta tus apellidos.
                                </span>
                            </label>
                            <label className="Main__personal__names__dateBorn">Fecha nacimiento
                                <input type="date" name="personal_dateborn" placeholder="2000-02-15"/>
                                <span className="form-error">
                                    Hace falta tu fecha de nacimiento.
                                </span>
                            </label>
                        </div>
            </section>
        );
    }
    
}
export default RegisterEmptyFounder;