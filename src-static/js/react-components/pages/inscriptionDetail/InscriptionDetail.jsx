import React, {Componet, Component} from 'react';
import api from '../../../api/api.jsx';
import MessageError from '../../MessageError/MessageError.jsx';
import ContentLoading from '../../ContentLoading/ContentLoading.jsx';
import HeaderYoungDetail from './HeaderYoungDetail.jsx';
import ParentsList from './ParentsList.jsx';
import BrothersList from './BrothersList.jsx';

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
                <Details {...this.props} data={this.state.detail.bodyObject}/>
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
        <section className={props.classSection}>
            <HeaderYoungDetail {...props.data.young}/>
            <WhoLives {...props.data}/>
            <Study {...props.data}/>
            <Job {...props.data}/>
            <ParentsList/> 
            <BrothersList/> 
            <SpecialFood {...props.data}/>
            <WhoInviteMe {...props.data}/>
            <AboutFDS {...props.data}/>
            {props.data.other_experiences && <AboutOtherExperiences {...props.data}/> }

        </section>
    );

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
                    {props.do_you_study?(<td>Sí</td>):(<td>No</td>)}
                    {props.carrer.length>0?(<td>{props.carrer}</td>):(<td>No tiene</td>)}
                    {props.school.length>0?(<td>{props.school}</td>):(<td>No tiene</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let Job = (props)=>{
    return(
        <article>
            <h3>Información laboral</h3>
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
                        {props.do_you_work?(<td>Sí</td>):(<td>No</td>)}
                        {props.company.length>0?(<td>{props.company}</td>):(<td>No tiene</td>)}
                        {props.position_job.length>0?(<td>{props.position_job}</td>):(<td>No tiene</td>)}
                        {props.phone_company.length>0?(<td>{props.phone_company}</td>):(<td>No tiene</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let WhoLives = (props)=>{
    return(
        <article>
            <h3>Actualmente vive con</h3>
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
                         {props.life_with_gran?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_parent?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_only_mother?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_only_father?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_uncles?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_friends?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_cousins?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_brothers?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                         {props.life_with_alone?(<td><span className="label success"> Sí</span></td>):(<td></td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let SpecialFood = (props)=>{
    return(
        <article>
            <h3>Limitaciones de salud</h3>
            <table>
                <thead>
                    <tr>
                        <td>Enfermedades</td>
                        <td>Alimentación especial</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.illness.length>0?(<td>{props.illness}</td>):(<td>No tiene</td>)}
                        {props.especial_food.length>0?(<td>{props.especial_food}</td>):(<td>No necesita</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let WhoInviteMe = (props)=>{
    return(
        <article>
            <h3>Invitado por</h3>
            <table>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Número</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.who_invite_me.length>0?(<td>{props.who_invite_me}</td>):(<td>Nadie</td>)}
                        {props.who_invite_me_number.length>0?(<td>{props.who_invite_me_number}</td>):(<td>No tiene</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
let AboutFDS = (props)=>{
    
    return(
        <article>
            <h3>Acerca del FDS</h3>
            <table>
                <thead>
                    <tr>
                        <td>Le interesa el EJ</td>
                        <td>Por que el FDS</td>
                        <td>Otras experiencias</td>
                        <td>Paz y salvo</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {props.do_you_want_ej?(<td>Sí</td>):(<td>No</td>)}
                        {props.why_fds.length>0?(<td>{props.why_fds}</td>):(<td>Sín comentarios</td>)}
                        {props.other_experiences?(<td>Sí</td>):(<td>Ninguna</td>)}
                        <td>{props.pieces_save}</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}

let AboutOtherExperiences = (props)=>{
    
    return(
        <article>
            <h3>Otras experiencias</h3>
            <table>
                <thead>
                    <tr>
                        <td>¿Otras experiencias?</td>
                        <td>¿Cuales?</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sí</td>
                        {props.experiences_which.length>0?(<td>{props.experiences_which}</td>):(<td>Ninguna</td>)}
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
export default InscriptionDetail;