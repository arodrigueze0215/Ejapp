
import React, { Component } from 'react';
import FormLayout from './FormLayout.jsx';
import DataYoungToUpdate from './DataYoungToUpdate.jsx';

class FormUpdateInscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldsRequired: {
                personal_gender: true,
                personal_names: true,
                personal_lastnames: true,
                personal_dateborn: true,
                personal_email: true,
                personal_username: true,
            },
        }
    }
    render(){
        return (
            <FormLayout>
                <h2>Editar ficha.</h2>
                <DataYoungToUpdate {...this.state}/>
                <section className="Main__submit">
                    <button type="submit" 
                        value="submit" 
                        className="Main__submit__updateInscription button">Actualizar
                    </button>
                </section>
            </FormLayout>
        );
    }
}
export default FormUpdateInscription;
