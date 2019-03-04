/* eslint-disable no-unused-vars */
import React from 'react';

const YoungSelected = (props) => {
	 console.log(props.user);
     const young = props.user
     const { user }= young;
	return(
			<section className="Main__newFounder__youngSelected">
				<div>
                        <div className="Main__newFounder__youngSelected__title">
                            Detalle de la información
                        </div>
						<div className="Main__newFounder__youngSelected__data">
							<span><strong>Nombre completo:</strong> {user.first_name} { user.last_name }</span>
                            <span><strong>Correo:</strong> { user.email }</span>
                            <span><strong>Dirección:</strong> { young.address }</span>
                            <span><strong>Fecha nacimiento</strong>{ young.date_born } </span>
                            <span><strong>Teléfono de casa:</strong> { young.home_phone }</span>
                            <span><strong>Teléfono personal:</strong> { young.mobile_phone }</span>
                            <span><strong>Ocupación: </strong> { young.occupation }</span>
                            <span><strong>Profesión:</strong> { young.profession }</span>
						</div>

				</div>
				<button onClick={props.click}>Completar registro</button>
			</section>
	);
};
export default YoungSelected;
