
import React, { Component } from 'react';
import api from '../../../api/api.js';
import MessageError from '../../Commons/MessageError/MessageError.jsx';
import ContentLoading from '../../Commons/ContentLoading/ContentLoading.jsx';
class SelectCities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    async componentDidMount() {
        const data = await api.cities.getCitiesList();
        this.setState({
            data
        });
    }

    render() {
        if (this.state.data.result==='ok'&& this.state.data.status>=200 && this.state.data.status<=207) {
            const options = this.state.data.bodyObject.map((city) => 
                <option key={city.id} value={city.id}>{city.name}</option>
            );
            if (this.props.typeSelect==='1') {
                
                return(
                    <select value={this.props.city_fds} onChange= {this.props.selectCityFds}>
                        <option key='0' value='0' >Selecciona una ciudad</option>
                        {options}
                    </select>
                );
            }else if (this.props.typeSelect==='2') {
                return(
                    <select value={this.props.active_city} onChange= {this.props.selectCityActive}>
                        <option key='0' value='0' >Selecciona una ciudad</option>
                        {options}
                    </select>
                );
                
            } else {
                return(
                    <span>No se definió un tipo de selector</span>
                    );  
            } 
            
        } else if (this.state.data.result==='error') {
            return(
                <MessageError status={this.state.data.status} statusText={this.state.data.statusText}/>
                );  
            
        } else {
            return(
                <span>Cargando ciudades...</span>
                );  
        }
    }
}
export default SelectCities;