/* eslint-disable no-unused-vars */
import React from 'react';
import SelectAreas from '../../Commons/SelectAreas/SelectAreas.jsx';
import CityFds from '../../Commons/SelectCities/SelectFunctionalCities/CityFds.jsx';
import ActiveCity from '../../Commons/SelectCities/SelectFunctionalCities/ActiveCity.jsx';

function DataFound(props){
	const styleRequired = {
		color: 'red'
	};
    let young="";
    let user={};
    if (props.user_selected) {
        young = props.user_selected;
        user = young.user;
    }
	return(
		<section>
			<section>
				<h3>Datos como encontrado</h3>
				<div>
					<label
						className="Main__dataFound__state"
						style={!props.fieldsRequired['state']? styleRequired:{}}>¿Eres un encontrado activo? # FDS {!props.fieldsRequired['state']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<select name="state">
							<option value="0">Selecciona una opción</option>
							<option value="1">Activo</option>
							<option value="2">Inactivo</option>
						</select>
					</label>
				</div>
				<div>
					<label
						className="Main__dataFound__numberFds"
						style={!props.fieldsRequired['number_fds']? styleRequired:{}}>
                        # FDS {!props.fieldsRequired['number_fds']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<input type="tel" placeholder="Número de FDS que viviste" name="number_fds"/>
					</label>
				</div>
				<div>
					<label
						className="Main__dataFound__selectFdsCity"
						style={!props.fieldsRequired['city_fds']? styleRequired:{}}>
                    Selecciona la ciudad donde viviste tu FDS
						<CityFds name="city_fds"
							{...props}
						/>
					</label>
				</div>
				<div>
					<label
						className="Main__dataFound__selectCityActive"
						style={!props.fieldsRequired['active_city']? styleRequired:{}}>
                    Selecciona la ciudad donde fue la última vez que estuviste activo o  donde actualmente estas activo
						{!props.fieldsRequired['active_city']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<ActiveCity name="active_city"
							{...props}
						/>
					</label>
				</div>
				<div>
					<label className="Main__dataFound__nameParentFds">Nombre de tu Papá / Mamá de FDS
						<input type="text" placeholder="Nombre y apellido" name="nameparent"/>
					</label>
				</div>
				<div>
					<label
						className="Main__dataFound__selectArea"
						style={!props.fieldsRequired['area']? styleRequired:{}}>
                    Selecciona el área al que perteneces.
						{!props.fieldsRequired['area']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<SelectAreas name="area"/>
					</label>
				</div>
			</section>
			<section>
				<h3>Datos de registro</h3>

				<div>
					<label className="Main__dataRegister__username"
						style={!props.fieldsRequired['personal_username']? styleRequired:{}}>
                    nickname
						{!props.fieldsRequired['personal_username']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<input
                            type="text"
                            placeholder="Ingresa un Nickname o Apodo que tengas"
                            name="personal_username"
                            />
					</label>
					<label className="Main__dataRegister__email"
						style={!props.fieldsRequired['personal_email']? styleRequired:{}}>
                    Correo electrónico
						{!props.fieldsRequired['personal_email']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<input type="email"
							placeholder={user.email? user.email: "encontrado@gmail.com"}
							name="personal_email"
							disabled={user.email? true:false}
							defaultValue={user.email? user.email: ""}
						/>
					</label>
					<label className="Main__dataRegister__password"
						style={!props.fieldsRequired['password']? styleRequired:{}}>
                        Contraseña
						{!props.fieldsRequired['password']? ' (ESTE CAMPO ES OBLIGATORIO)':''}
						<input type="password" placeholder="Contraseña" name="password" />
					</label>
				</div>
			</section>
		</section>
	);
}
export default DataFound;
