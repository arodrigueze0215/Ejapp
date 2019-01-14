/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import api from '../../../../api/api.js';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.searchName = React.createRef();
		this.searchLastname = React.createRef();
		this.searchEmail = React.createRef();

		this.searchClick = this.searchClick.bind(this);

	}
	render() {
		return(
			<section className="Main__newFounder__searchYoung">
				<div>
					<label>
						<input type="text" 
							ref={this.searchName}
							placeholder="Nombre"/>
					</label>
				</div>
				<div>
					<label>
						<input type="text" 
							ref={this.searchLastname}
							placeholder="Apellidos"/>
					</label>
				</div>
				<div>
					<label>
						<input type="text" 
							ref={this.searchEmail}
							placeholder="Correo"/>
					</label>
				</div>
				<div className="Main__newFounder__searchYoung__submitSearch">
					<button type="submit" 
						value="submit" 
						onClick={this.searchClick}
						className="Main__newFounder__searchYoung__submitSearch__search  button">Buscar
					</button>
				</div>
				
			</section>
		);
	}
	searchClick() {
		const name = this.searchName.current.value
		const lastname = this.searchLastname.current.value
		const email = this.searchEmail.current.value
	}

	
}