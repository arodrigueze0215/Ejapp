import React, {Component} from 'react';
import api from '../../../api/api.js';
import MessageError from '../../Commons/MessageError/MessageError.jsx';


class SelectAreas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    async componentDidMount() {
        const data = await api.areas.getAreasList();
        this.setState({
            data
        });
    }

    render() {
        if (this.state.data.result==='ok'&& this.state.data.status>=200 && this.state.data.status<=207) {
            const options = this.state.data.bodyObject.map((area) => 
                <option key={area.id} value={area.id}>{area.name}</option>
            );
            return(
                <select value={this.props.area} onChange={this.props.selectAreas}>
                    <option key='0' value='0' >Selecciona un área</option>
                    {options}
                </select>
            );
            
        } else if (this.state.data.result==='error') {
            return(
                <MessageError status={this.state.data.status} statusText={this.state.data.statusText}/>
                );  
            
        } else {
            return(
                <span>Cargando Areas...</span>
                );  
        }
    }
}
export default SelectAreas;