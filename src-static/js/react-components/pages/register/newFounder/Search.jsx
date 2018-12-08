import React, {Component} from 'react';

export default class Search extends Component {
	render() {
		return(
			<section className="Main__newFounder__searchYoung">
				<div>
					<label>
						<input type="text" placeholder="Nombre"/>
					</label>
				</div>
				<div>
					<label>
						<input type="text" placeholder="Apellidos"/>
					</label>
				</div>
				<div>
					<label>
						<input type="text" placeholder="Correo"/>
					</label>
				</div>
				<div className="Main__newFounder__searchYoung__submitSearch">
					<button type="submit" 
						value="submit" 
						className="Main__newFounder__searchYoung__submitSearch__search button">Buscar
					</button>
				</div>
				
			</section>
		)
	}
}