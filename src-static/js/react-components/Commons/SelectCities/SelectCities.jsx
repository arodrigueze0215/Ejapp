
import React from 'react';
function SelectCities(props) {
    const options = props.datacities.bodyObject.map((city) => 
        <option key={city.id} value={city.name}>{city.name}</option>
    );
    return(
        <select value={props.value} onChange={props.onChange} name={props.name}>
            <option key='0' value='0' >Selecciona una ciudad</option>
            {options}
        </select>
    );
}
export default SelectCities;