/* eslint-disable no-unused-vars */
import React from 'react';

const Search = (props) =>{
	return(
		<section className="Main__newFounder__searchYoung">
			<div className='Main__newFounder__searchYoung__fieldSearch'>
				<label>
					<input type="text"
						name="filter_full_name"
						onChange={props.onFilteredChange}
						placeholder="Nombres Apellidos o Correo"/>
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
