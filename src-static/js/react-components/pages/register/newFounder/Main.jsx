/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import Search from './Search.jsx';
import YoungSelected from './YoungSelected.jsx';
import Form from './Form.jsx';
import DataFound from '../DataFound.jsx';
import api from '../../../../api/api.js';
import ContentLoading from '../../../Commons/ContentLoading/ContentLoading.jsx';
import ListYoung from './ListYoung.jsx';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			filter_first_name:'',
			filter_last_name:'',
			filter_email:'',
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
			},
			data_filtered:{}
		};
		this.onclickSearch = this.onclickSearch.bind(this);
		this.onFilteredChange = this.onFilteredChange.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	}
	async componentDidMount() {
		const datacities = await api.cities.getCitiesList();
		this.setState({
			datacities
		});
	}
	render() {
		if (this.state.datacities.result==='ok'&& this.state.datacities.status>=200 && this.state.datacities.status<=207) {
			const { open } = this.state;
			return(
				<section className="Main__newFounder">
					<Search 
						onClick={this.onclickSearch} 
						onFilteredChange={this.onFilteredChange}
					/>
					<YoungSelected/>
					<Form>
						<DataFound {...this.state}/>
					</Form>
					<Modal open={open} onClose={this.onCloseModal} center>
						<ListYoung data_filtered={this.state.data_filtered}/>
					</Modal>
				</section>
			);
		} else if (this.state.datacities.result==='error') {
			return(
				<MessageError status={this.state.datacities.status} statusText={this.state.datacities.statusText}/>
			);
		} else {
			return(
				<ContentLoading/>
			);
		}
	}

	async onclickSearch() {
		const first_name = this.state.filter_first_name
		const last_name = this.state.filter_last_name
		const email = this.state.filter_email
		const data = {
			first_name,
			last_name,
			email
		}
		let data_filtered = await api.young.searchYoung(data);
		console.log('data_filtered', data_filtered)
		this.setState({
			open: true,
			data_filtered
		});

	}
	onFilteredChange(event){
		const name = event.target.name;
		switch (name) {
			case 'filter_first_name':
				this.setState({
					[name]: event.target.value
				});
				
				break;
			case 'filter_last_name':
				this.setState({
					[name]: event.target.value
				});
				
				break;
			case 'filter_email':
				this.setState({
					[name]: event.target.value
				});				
				break;
		
			default:
				break;
		}
		
	}

	onCloseModal() {
		this.setState({ open: false });
	};
}