import React from 'react';
import {render} from 'react-dom';
import Nav from '../../Commons/nav/Nav.jsx';
import Main from './Main.jsx'
const target = document.getElementById('reactTargetFounderDetail');

let MainDetail = (props) =>{
    return(
        <div>
            <Nav/>
            <div className="content">
              <div className="content__founderDetails">
                <Main/>
              </div>
            </div>
        </div>

    );
}

if (target!==null) {
    render(
       <MainDetail/>,
        target
    );
}
