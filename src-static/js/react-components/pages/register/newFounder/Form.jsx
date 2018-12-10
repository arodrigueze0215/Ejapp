import React, {Component} from 'react';

export default class Form extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return(
			<section>
				<form>
					{this.props.children}
				</form>
			</section>
		);
	}
}