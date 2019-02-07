/* eslint-disable no-unused-vars */
import React from 'react';

const YoungSelected = (props) => {
	 console.log(props.user);
	return(
			<section className="Main__newFounder__youngSelected">
				<div>
						<div className="Main__newFounder__youngSelected__data">
							<span>{props.user.first_name}</span>
							<span>{props.user.last_name}</span>
							<span>{props.user.email}</span>

						</div>

				</div>
				<button onClick={props.click}>Completar registro</button>
			</section>
	);
};
export default YoungSelected;