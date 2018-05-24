import React from 'react';
import SelectCities from '../SelectCities.jsx';

let CityFds = (props) => {
    return(
        <SelectCities value={props.city_fds} onChange= {props.handleSelectCityFdsChange} {...props.datacities}/>
    );

}

export default CityFds;