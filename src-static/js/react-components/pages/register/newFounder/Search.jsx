/* eslint-disable no-unused-vars */
import React from 'react';

const Search = (props) =>{
	return(
		<section className="Main__newFounder__searchYoung">
			<div>
				<label>
					<input type="text"
						name="filter_first_name"
						onChange={props.onFilteredChange} 
						placeholder="Nombre"/>
				</label>
			</div>
			<div>
				<label>
					<input type="text" 
						name="filter_last_name"
						onChange={props.onFilteredChange} 
						placeholder="Apellidos"/>
				</label>
			</div>
			<div>
				<label>
					<input type="email" 
						name="filter_email"
						onChange={props.onFilteredChange} 
						placeholder="Correo"/>
				</label>
			</div>
			<div className="Main__newFounder__searchYoung__submitSearch">
				<button type="submit" 
					value="submit" 
					onClick={props.onClick}
					className="Main__newFounder__searchYoung__submitSearch__search  button">Buscar
				</button>
			</div>
			
		</section>
	);	
}
export default Search;