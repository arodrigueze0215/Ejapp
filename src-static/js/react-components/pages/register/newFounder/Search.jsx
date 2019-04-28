/* eslint-disable no-unused-vars */
import React from 'react';

const Search = (props) =>{
	const style = {
		display: 'none'
	}
	return(
		<section className="Main__newFounder__search">
			<section className="Main__newFounder__search__infoMessage" style={props.visibleInfo?{}:style}>
				<p>
					En el siguiente buscador deberás ingresar tu nombre, apellido o correo para buscar tu
					infomación de la ficha de inscripción que llenaste en tu FDS. Solo tienes que completar el registro
					para convertirte en Encontrado dentro de la plataforma.
				</p>
				<button className="Main__newFounder__search__infoMessage__close" onClick={props.hide}>Cerrar</button>
			</section>
			<section className="Main__newFounder__search__searchYoung">
				<div className='Main__newFounder__search__searchYoung__fieldSearch'>
					<label>
						<input type="text"
							name="filter_full_name"
							onChange={props.onFilteredChange}
							placeholder="Nombres Apellidos o Correo"/>
					</label>
				</div>
				<div className="Main__newFounder__search__searchYoung__submitSearch">
					<button type="submit"
						value="submit"
						onClick={props.onClick}
						className="Main__newFounder__search__searchYoung__submitSearch__search  button">Buscar
					</button>
				</div>
			</section>
		</section>
	);
}
export default Search;
