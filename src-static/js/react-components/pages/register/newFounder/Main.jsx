import React, {Component} from 'react';
import Search from './Search.jsx';
import YoungSelected from './YoungSelected.jsx';
import Form from './Form.jsx';
import DataFound from '../DataFound.jsx';
import api from '../../../../api/api.js';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datacities: {},
			fieldsRequired: {
				personal_gender: true,
				personal_names: true,
				personal_lastnames: true,
				personal_dateborn: true,
				personal_email: true,
				personal_username: true,
				number_fds: true,
				state: true,
				city_fds: true,
				active_city: true,
				area: true,
				password: true,
			}
		}
	}
	async componentDidMount() {
        const datacities = await api.cities.getCitiesList();
        this.setState({
            datacities
        });
    }
	render() {
		return(
			<section className="Main__newFounder">
				<Search/>
				<YoungSelected/>
				<Form>
					<DataFound {...this.state}/>
				</Form>
			</section>
		)
	}
}