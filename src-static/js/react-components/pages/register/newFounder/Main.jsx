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
    this.dataToSend = {}
		this.state = {
			msgerror: '',
			open:false,
			show_form:false,
			show_listYoung:false,
			show_while:false,
			filter_full_name:'',
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
    this.onSubmitForm = this.onSubmitForm.bind(this);
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
			const { show_while } = this.state;
			const { show_listYoung } = this.state;
			const { msgerror } = this.state;
			console.log(user_selected);
			return(
				<section className="Main__newFounder">
            <Search
              onClick={this.onclickSearch}
              onFilteredChange={this.onFilteredChange}
            />

					{ show_while &&
						<ContentLoading/>
					}
					{ show_form &&
						<Form submit={this.onSubmitForm}>
							<DataFound {...this.state}/>
                <button
                    type="submit"
                    value="submit"
                    className="Main__newFounder__form_submit button">
                        Completar registro
                </button>
						</Form>
					}
					{ show_listYoung &&
						<ListYoung dataFiltered= { this.state.data_filtered } click = {this.onClickItem}/>
					}
					<Modal open={open} onClose={this.onCloseModal} center>
						{
							msgerror!=='' &&
							<span> { msgerror }</span>
						}
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
		const full_name = this.state.filter_full_name
		const data = {
			full_name
		}
		this.setState({
			show_while: true,
			show_listYoung:false
		});
		let data_filtered = await api.young.searchYoung(data);
		const show_listYoung = true;
		this.setState({
			data_filtered,
			show_listYoung,
			show_while: false
		});

	}
	onFilteredChange(event){
		const name = event.target.name;
		switch (name) {
			case 'filter_full_name':
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
		const user_selected = itemSelected[0];
        const show_form = false;
		this.setState({ user_selected, show_form });


	}
	onCompleteForm() {
		const show_form = true;
		this.setState({ show_form });
	}

  async onSubmitForm(event) {
      event.preventDefault();
			this.dataToSend.state = event.target.elements['state'].value;
			this.dataToSend.number_fds = event.target.elements['number_fds'].value;
			this.dataToSend.city_fds = event.target.elements['city_fds'].value;
			this.dataToSend.active_city = event.target.elements['active_city'].value;
			this.dataToSend.area = event.target.elements['area'].value;
			this.dataToSend.password = event.target.elements['password'].value;
			this.dataToSend.nameparent = event.target.elements['nameparent'].value;
			this.dataToSend.personal_username = event.target.elements['personal_username'].value;
			let i = 0;
			let fieldsRequired = this.state.fieldsRequired;
			if (this.dataToSend.personal_username.length===0) {
          fieldsRequired['personal_username'] = false;
          i++;
      } else {
          fieldsRequired['personal_username'] = true;
      }
      if (this.dataToSend.number_fds.length===0) {
          fieldsRequired['number_fds'] = false;
          i++;
      } else {
          fieldsRequired['number_fds'] = true;
      }
      if (this.dataToSend.city_fds=='0') {
          fieldsRequired['city_fds'] = false;
          i++;
      } else {
          fieldsRequired['city_fds'] = true;
      }
      if (this.dataToSend.active_city=='0') {
          fieldsRequired['active_city'] = false;
          i++;
      } else {
          fieldsRequired['active_city'] = true;
      }
      if (this.dataToSend.area=='0') {
          fieldsRequired['area'] = false;
          i++;
      } else {
          fieldsRequired['area'] = true;
      }
      if (this.dataToSend.password.length===0) {
          fieldsRequired['password'] = false;
          i++;
      } else {
          fieldsRequired['password'] = true;
      }
      if (this.dataToSend.state=='0') {
          fieldsRequired['state'] = false;
          i++;
      } else {
          fieldsRequired['state'] = true;
      }
      if (i>0) {
        this.setState({
            fieldsRequired
        })
				return;
			}
			else {
				this.dataToSend.idyoung = this.state.user_selected.id;
				const response = await api.founds.postNewFound(this.dataToSend);
				if (response.result=='ok'&& response.status>=200 && response.status<=207) {
						let url = `/resultado/?result=${response.result}&message=${response.statusText}&personal_name=${response.bodyObject.young.user.first_name}&type=registerfound`
						window.location.href = url;
				}else {
						this.setState({
								open:true,
								msgerror: response.statusText
						});
				}
			}

  }

	onCloseModal() {
		const open = false;
		const msgerror = '';
		this.setState({ open, msgerror });
	};

}
