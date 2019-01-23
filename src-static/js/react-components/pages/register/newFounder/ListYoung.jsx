import React, {Component} from 'react';

const listYoung = (props) => {
	const data = props.data_filtered;
	if (data.result==='ok'&& data.status===200) {
		const dataList = data.bodyObject;
		const element = dataList.map(element => {
			return (
				<li key={element.id}>
					<div className="Main__searchModal__item">
						<span className="Main__searchModal__item__fullname">{element.user.first_name} {element.user.last_name}</span>
						<span className="Main__searchModal__item__email">{element.user.email}</span>
					</div>
				</li>
			);			
		});

		return(
			<section>
				<div className="Main__searchModal">
					<ul>
						{element}
					</ul>
				</div>				
			</section>
		);
	} else if(data.result==='error'){
		return(
			<span>{data.statusText}</span>
		)
	}
}

export default listYoung;