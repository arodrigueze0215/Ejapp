import React, {Component } from "react";

class Nav extends Component{
    render(){
        
        return(
            <nav className="navFds">
                <nav className="top-bar">
                    <NavLogo/>
                    <UlNav/>
                </nav>
            </nav>
        );

    }
}

let UlNav = (props)=>{
    return(
        <ul className="dropdown menu" data-dropdown-menu>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Asitencia</a></li>
            <li><a href="#">Talleres</a></li>
            <li><a className="navFds__itemMenuSelected">FDS</a></li>
            <li><a href="#">Profundos</a></li>
            <li><a href="#">Consejeros</a></li>
            <li>
                <a>Nombre Apellido</a>
                <ul className="menu vertical">
                    <li><a href="#">Perfil</a></li>
                    <li><a href="{% url 'main:login:logout' %}">Salir</a></li>
                </ul>
            </li>
        </ul>
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