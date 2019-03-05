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
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Nombre completo:</strong> </span>
									<span>{user.first_name} { user.last_name }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Correo:</strong></span>
									<span>{ user.email }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Dirección:</strong></span>
									<span>{ young.address }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Fecha nacimiento</strong></span>
									<span>{ young.date_born }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Teléfono de casa:</strong></span>
									<span>{ young.home_phone }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Teléfono personal:</strong></span>
									<span>{ young.mobile_phone }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Ocupación: </strong></span>
									<span>{ young.occupation }</span>
								</div>
								<div className="Main__newFounder__youngSelected__data__label">
									<span><strong>Profesión:</strong></span>
									<span>{ young.profession }</span>
								</div>
						</div>

				</div>
				<button onClick={props.click}>Completar registro</button>
			</section>
	);
};
export default YoungSelected;
