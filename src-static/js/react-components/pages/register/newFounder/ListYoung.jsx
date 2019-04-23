import React, {Component} from 'react';
import YoungSelected from './YoungSelected.jsx';

const listYoung = (props) => {
	const data = props.dataFiltered;
	if (data.result==='ok'&& data.status===200) {
		const dataList = data.bodyObject;
		const element = dataList.map(element => {
			return (
				<YoungSelected
					key={element.id}
					user={ element }
					click = { props.onClickItem }
					id = {element.id}
				/>
			);
		});

		return(
			<section className='Main__newFounder__listYoung'>
				<section className='Main__newFounder__listYoung__count'>
					<span>{element.length} Resultados</span>
				</section>
				{element}
			</section>
		);
	} else if(data.result==='error'){
		return(
			<section className="Main__searchModal__noFound">
				<span>{data.statusText}</span>
			</section>
		)
	}
}

export default listYoung;
