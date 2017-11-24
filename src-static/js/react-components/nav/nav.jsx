import React, {Component } from "react";
import api from '../../api/api.jsx';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            user:{
                authUser:{
                    young:{
                        user:{
                            first_name:'Nombre',
                            last_name:'Apellido',
                        }
                    }
                }
            },
        }
    }
    async componentDidMount(){
        const user = await api.apiAuth.getApiAuth();
        this.setState({
            user,
        });
    }
    render(){
        if (this.state.user.result==='ok'&& this.state.user.status===200) {
            return(
                <nav className="navEj">
                    <nav className="top-bar">
                        <NavLogo/>
                        <UlNav user={this.state.user}/>
                    </nav>
                </nav>
            );

        }else{
            return(
                <nav className="navEj">
                    <nav className="top-bar">
                        <NavLogo/>
                        <UlNav user={this.state.user}/>
                    </nav>
                </nav>
            );
        }

    }
}

let UlNav = (props)=>{
    let userAuth= `${props.user.authUser.young.user.first_name} ${props.user.authUser.young.user.last_name}`;
    return(
        <div className="top-bar-right">
            <ul className="dropdown menu" data-dropdown-menu>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Asitencia</a></li>
                <li><a href="#">Talleres</a></li>
                <li><a className="navFds__itemMenuSelected" href="/fds/">FDS</a></li>
                <li><a href="#">Profundos</a></li>
                <li><a href="#">Consejeros</a></li>
                <li>
                    <a>{userAuth}</a>
                    <ul className="menu vertical">
                        <li><a href="#">Perfil</a></li>
                        <li><a href="/logout/">Salir</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
let NavLogo = (props) =>{
    return(
        <div className="top-bar-left">
            <ul className="menu">
                <li className="menu-text">Site Title</li>
            </ul>
        </div>
    );
}
export default Nav;