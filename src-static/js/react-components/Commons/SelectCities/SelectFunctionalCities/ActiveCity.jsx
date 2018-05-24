import React from 'react';
import SelectCities from '../SelectCities.jsx';

let ActiveCity = (props) => {
    return(
        <SelectCities value={props.active_city} onChange= {props.handleSelectCityActiveChange} {...props.datacities}/>
    );

}

export default ActiveCity;