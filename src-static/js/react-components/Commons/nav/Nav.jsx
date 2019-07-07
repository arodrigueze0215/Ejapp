const $ = window.$ = window.jQuery= require('jquery');
let moment = require('moment');
window.moment = moment;
require('../../../libs/foundation.min.js');
require('../../../libs/datetime-moment.js');
require('datatables.net');
require('../../../libs/datetime.js');
import React, {Component } from "react";
import api from '../../../api/api.js';
import hamburger from '../../../../images/hamburger.png';

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
        $(document).foundation();
        const user = await api.apiAuth.getApiAuth();
        if (user.result==='ok'&& user.status===200) {
            this.setState({
                user,
            });            
        }
    }
    render(){
        return(
            <header>
                <nav className="navEj">
                    <div className="top-bar">
                        <NavLogo/>
                        <UlNav user={this.state.user}/>
                        <Hamburger/>
                    </div>
                </nav>
                <MenuSlide user={this.state.user}/>
            </header>
        );
    }
}

let UlNav = (props)=>{
    const { first_name, last_name, user_permissions } = props.user.authUser.young.user;
    console.log(user_permissions)
    let isAdviser = false;
    if (user_permissions !== undefined) {
        for (let permission in user_permissions) {
            if (permission.codename === 'is_adviser') {
                isAdviser = true;
                break;
            }
        }
    }
    let userAuth= `${first_name} ${last_name}`;
    return(
        <div className="top-bar-right navEj__menuOptions">
            <ul className="dropdown menu" data-dropdown-menu>
                { isAdviser &&
                    <li><a className="navEj__itemMenuSelected" href="/fds/">FDS</a></li>
                }
                <li>
                    <a>{userAuth}</a>
                    <ul className="menu vertical">
                        <li><a href="/encontrado/detalle">Perfil</a></li>
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
                <li className="menu-text">EJ</li>
            </ul>
        </div>
    );
}
let Hamburger = ()=>{
    function onClickHamburger(){
        let $menuSlide = document.getElementById('menuSlide');
        $menuSlide.classList.toggle('menuSlide--active');
        
    }
    return(
       <div id="navEj__hamburger" className="top-bar-right navEj__hamburger" onClick={onClickHamburger}>
            <img className="navEj__hamburger__image" src={hamburger} alt="icon"/>
       </div>
    );

}
let MenuSlide = (props) =>{
    let handleTouchStart = (e)=>{
        let $prfile = document.getElementById('menuSlide__content__listItem__myProfile');
        let $logout = document.getElementById('menuSlide__content__listItem__logout');
        $prfile.classList.toggle('menuSlide__content__listItem__item--active');
        $logout.classList.toggle('menuSlide__content__listItem__item--active');
    }
    const { first_name, last_name, user_permissions } = props.user.authUser.young.user;
    let isAdviser = false;
    if (user_permissions !== undefined) {
        for (let permission in user_permissions) {
            if (permission.codename === 'is_adviser') {
                isAdviser = true;
                break;
            }
        }
    }
    const userAuth= `${first_name} ${last_name}`;
    return(
        <nav id="menuSlide" className="menuSlide">
            <div className="menuSlide__content">
                <ul className="menu menuSlide__content__listItem" data-dropdown-menu>
                    { isAdviser &&
                        <li><a className="navEj__itemMenuSelected" href="/fds/">FDS</a></li>
                    }
                    <li>
                        <a onTouchStart={handleTouchStart}>{userAuth}</a>

                    </li>
                    <li
                        id="menuSlide__content__listItem__myProfile"
                        className="menuSlide__content__listItem__myProfile menuSlide__content__listItem__item--active">
                            <a href="/encontrado/detalle/">MI perfil</a>
                    </li>
                    <li id = "menuSlide__content__listItem__logout" className="menuSlide__content__listItem__logout menuSlide__content__listItem__item--active"><a href="/logout/">Salir</a></li>
                </ul>
            </div>
        </nav>
    );
}
export default Nav;
