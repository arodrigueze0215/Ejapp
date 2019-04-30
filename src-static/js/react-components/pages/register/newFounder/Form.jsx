import React, {Component} from 'react';

export default class Form extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return(
			<section>
				<form onSubmit={this.props.submit}>
					{this.props.children}
				</form>
			</section>
		);
	}
}
