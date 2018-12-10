/* eslint-disable no-unused-vars */
import React, {Component} from 'react';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.searchName = React.createRef();
		this.searchFullname = React.createRef();
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
							ref={this.searchFullname}
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
		//console.log(this.searchName.current.value);
	}

	
}