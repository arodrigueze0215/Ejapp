import React, {Component} from 'react';

const listYoung = (props) => {
	const data = props.data_filtered;
	if (data.result==='ok'&& data.status===200) {
		const dataList = data.bodyObject;
		const element = dataList.map(element => {
			return (
				<li key={element.id} onClick={props.clickItem} id={element.id}>
					<div className="Main__searchModal__item">
						<span className="Main__searchModal__item__fullname">{element.user.first_name} {element.user.last_name}</span>
						<span className="Main__searchModal__item__email"><strong>Correo:</strong> {element.user.email}</span>
						<span className="Main__searchModal__item__email"><strong>Fecha nacimiento:</strong> {element.date_born}</span>
						<span className="Main__searchModal__item__email"><strong>Dirección:</strong> {element.address}</span>
					</div>
				</li>
			);			
		});

		return(
			<section>
				<div className="Main__searchModal__title">
					<h5>Selecciona tu nombre</h5>
				</div>
				<div className="Main__searchModal">
					<ul>
						{element}
					</ul>
				</div>				
			</section>
		);
	} else if(data.result==='error'){
		return(
			<div className="Main__searchModal__noFound">
				<span>{data.statusText}</span>
			</div>
		)
	}
}

export default listYoung;