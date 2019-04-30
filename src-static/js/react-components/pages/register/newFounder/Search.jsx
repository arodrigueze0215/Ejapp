/* eslint-disable no-unused-vars */
import React from 'react';

const Search = (props) =>{
	const style = {
		display: 'none'
	}
	const styleOld = {
		display: 'none'
	}
	return(
		<section className="Main__newFounder__search">
			<section className="Main__newFounder__search__infoMessage" style={props.infoOld?{}:styleOld}>
				<p>
					Si eres un encontrado "Vieja guardia" de ya hace unos años de antiguedad, y tu proceso de inscripción
					para tu FDS no fue por medio de la plataforma; entonces debes inscribirte
					<a className="Main__newFounder__search__infoMessage__close" href="/nuevo/"> Aquí.</a>
				</p>
				<button className="Main__newFounder__search__infoMessage__close" onClick={props.hideOld}>Cerrar</button>
			</section>
			<section className="Main__newFounder__search__infoMessage" style={props.visibleInfo?{}:style}>
				<p>
					Si tu proceso de inscripción para tu FDS fue por medio de la plataforma entonces
					en el siguiente buscador deberás ingresar tu nombre, apellido o correo para buscar tu
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
