import React, {Componet, Component} from 'react';
import api from '../../../api/api.jsx';
import MessageError from '../../MessageError/MessageError.jsx';
import ContentLoading from '../../ContentLoading/ContentLoading.jsx';
import HeaderYoungDetail from './HeaderYoungDetail.jsx'

class InscriptionDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
        }
    }

    async componentDidMount(){
        const detail = await api.inscriptions.getYoungDetail();
        this.setState({
            detail
        });


    }

    render(){
        if (this.state.detail.result==='ok'&& this.state.detail.status===200) {
            return(
                <Details data={this.state.detail.bodyObject}/>
            );
        } else if(this.state.detail.result==='error'){
        
            return(
            <MessageError status={this.state.detail.status} statusText={this.state.detail.statusText}/>
            );            
        } else{
            return(
            <ContentLoading/>
            );            
            
        }
    }
}

let Details = (props) =>{
    return(
        <section>
            <HeaderYoungDetail {...props.data.young}/>
            <Study {...props.data}/>

        </section>
    );

    /*job study{
        do_you_study
        carrer
        school
    }*/

    /*job data{
        "do_you_work": false,
        "company": "",
        "position_job": "",
        "phone_company": "",
    }*/
    /* who lives{
        "life_with_gran": true,
        "life_with_parent": false,
        "life_with_only_mother": true,
        "life_with_only_father": false,
        "life_with_uncles": false,
        "life_with_friends": false,
        "life_with_cousins": false,
        "life_with_brothers": false,
        "life_with_alone": false,
    }*/
    /**
     special food{
        "illness": "",
        "especial_food": "",
     }
     */
    /* who invite me{
        "who_intive_me": "Andrés Rodriguez",
        "who_intive_me_number": "",
    }
     */
    /*
    about fds{
        "do_you_want_ej": true,
        "why_fds": "Por que sí",
        "other_experiences": "",
        "pieces_save": "DEBE"
    }
     */

}

let Study = (props)=>{
    console.log(props)
    return(
        <article>
            <h3>Información académica</h3>
            <table>
                <thead>
                    <tr>
                        <td>Estudiante</td>
                        <td>Carrera</td>
                        <td>Instituto/Universidad</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {props.do_you_study?(
                        <td>Sí</td>
                        ):
                        (
                        <td>No</td>

                        ) }
                        
                        <td>{props.carrer}</td>
                        <td>{props.school}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let Job = (props)=>{
    return(
        <article>
            <h1>Información laboral</h1>
            <table>
                <thead>
                    <tr>
                        <td>Trabajas</td>
                        <td>Empresa</td>
                        <td>Cargo</td>
                        <td>Telefono</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.work}</td>
                        <td>{props.company}</td>
                        <td>{props.position}</td>
                        <td>{props.phone}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let WhoLives = (props)=>{
    return(
        <article>
            <h1>Actualmente vive con</h1>
            <table>
                <thead>
                    <tr>
                        <td>Abuelos</td>
                        <td>Papás</td>
                        <td>Solo mamá</td>
                        <td>Solo papá</td>
                        <td>Tíos</td>
                        <td>Amigos</td>
                        <td>Primos</td>
                        <td>Hermanos</td>
                        <td>Solo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.life_with_gran}</td>
                        <td>{props.life_with_parent}</td>
                        <td>{props.life_with_only_mother}</td>
                        <td>{props.life_with_only_father}</td>
                        <td>{props.life_with_uncles}</td>
                        <td>{props.life_with_friends}</td>
                        <td>{props.life_with_cousins}</td>
                        <td>{props.life_with_brothers}</td>
                        <td>{props.life_with_alone}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
export default InscriptionDetail;