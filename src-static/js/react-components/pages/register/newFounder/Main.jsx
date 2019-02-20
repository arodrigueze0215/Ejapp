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
			show_form:false,
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
			data_filtered:{},
			user_selected:{}

		};
		this.onclickSearch = this.onclickSearch.bind(this);
		this.onFilteredChange = this.onFilteredChange.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onClickItem = this.onClickItem.bind(this);
		this.onCompleteForm = this.onCompleteForm.bind(this);
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
			const { user_selected } = this.state;
			const { show_form } = this.state;
			console.log(user_selected);
			return(
				<section className="Main__newFounder">
					{ !show_form &&
						<Search 
							onClick={this.onclickSearch} 
							onFilteredChange={this.onFilteredChange}
						/>
					}
					
					{ !show_form && Object.keys(user_selected).length > 0 &&
						<YoungSelected 
							user={this.state.user_selected}
							click={this.onCompleteForm}
						/>
					}
					{ show_form &&
						<Form>
							<DataFound {...this.state}/>
						</Form>
					}
					<Modal open={open} onClose={this.onCloseModal} center>
						<ListYoung data_filtered={this.state.data_filtered} clickItem={this.onClickItem}/>
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
	onClickItem(event){
		event.stopPropagation();
		this.onCloseModal();
		const { bodyObject } = this.state.data_filtered;
		let itemSelected = bodyObject.filter(item => item.id == event.currentTarget.id);
		const { user } = itemSelected[0];
		const user_selected = user
		console.log('itemSelected',`${user.first_name} ${user.last_name}`);
		this.setState({ user_selected });


	}
	onCompleteForm() {
		const show_form = true;
		this.setState({ show_form });
	}

	onCloseModal() {
		const open = false;
		this.setState({ open });
	};
}