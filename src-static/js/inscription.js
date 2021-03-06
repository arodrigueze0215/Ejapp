let $ = window.$ = window.jQuery= require('jquery');
require('moment');
require('./libs/datetime-moment.js');
require('./libs/foundation.min.js');
require('foundation-datepicker');
$(document).foundation();
document.addEventListener('DOMContentLoaded',function(){
	let brothers = new Array();
	let today = ()=> {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();  
		if(dd<10) dd = '0'+dd;    
		if(mm<10) mm = '0'+mm;    
		return  `${yyyy}-${mm}-${dd}`;
	};
	//init the current date. The date that would be fill by itself
	$('input[type=date][name=current_date]').val(today());
	if ( $('input[type="date"]').prop('type') != 'date' ) {
		$('input[type="date"]').fdatepicker({
			format: 'yyyy-mm-dd',
			leftArrow:'<<',
			rightArrow:'>>'
		});
	}


	$('input[type=radio][name=study]').change(function(){
		switch($(this).val()) {
		case 'true':
			$('input[type=text][name=study_carrer]').removeAttr('disabled');
			$('input[type=text][name=study_where]').removeAttr('disabled');
			break;
		case 'false':
			$('input[type=text][name=study_carrer]').attr('disabled', 'disabled');
			if($('input[type=text][name=study_carrer]').val().length>0){
				$('input[type=text][name=study_carrer]').val('');
			}
			$('input[type=text][name=study_where]').attr('disabled', 'disabled');
			if($('input[type=text][name=study_where]').val().length>0){
				$('input[type=text][name=study_where]').val('');
			}
			break;
		}
	});
	$('input[type=radio][name=work]').change(function(){
		switch($(this).val()) {
		case 'true':
			$('input[type=text][name=work_company]').removeAttr('disabled');         
			$('input[type=text][name=work_role]').removeAttr('disabled');         
			$('input[type=tel][name=work_phone]').removeAttr('disabled');         
			break;
		case 'false':
			$('input[type=text][name=work_company]').attr('disabled', 'disabled');         
			if($('input[type=text][name=work_company]').val().length>0){
				$('input[type=text][name=work_company]').val('');
			}
			$('input[type=text][name=work_role]').attr('disabled', 'disabled');         
			if($('input[type=text][name=work_role]').val().length>0){
				$('input[type=text][name=work_role]').val('');
			}
			$('input[type=tel][name=work_phone]').attr('disabled', 'disabled');
			if($('input[type=tel][name=work_phone]').val().length>0){
				$('input[type=tel][name=work_phone]').val('');
			}
			break;
		}
	});
	$('input[type=radio][name=dad]').change(function(){
		switch($(this).val()) {
		case 'true':         
			$('input[type=text][name=dad_ocupation]').removeAttr('disabled', 'disabled');         
			$('input[type=tel][name=dad_phone_home]').removeAttr('disabled', 'disabled');
			$('input[type=tel][name=dad_phone]').removeAttr('disabled', 'disabled');
			$('input[type=text][name=dad_address]').removeAttr('disabled', 'disabled');         
			break;
		case 'false':
			$('input[type=text][name=dad_ocupation]').attr('disabled', 'disabled');         
			if($('input[type=text][name=dad_ocupation]').val().length>0){
				$('input[type=text][name=dad_ocupation]').val('');
			}
			$('input[type=tel][name=dad_phone_home]').attr('disabled', 'disabled');
			if($('input[type=tel][name=dad_phone_home]').val().length>0){
				$('input[type=tel][name=dad_phone_home]').val('');
			}
			$('input[type=tel][name=dad_phone]').attr('disabled', 'disabled');
			if($('input[type=tel][name=dad_phone]').val().length>0){
				$('input[type=tel][name=dad_phone]').val('');
			}
			$('input[type=text][name=dad_address]').attr('disabled', 'disabled');
			if($('input[type=text][name=dad_address]').val().length>0){
				$('input[type=text][name=dad_address]').val('');
			}
			break;
		}
	});
	$('input[type=radio][name=mom]').change(function(){
		switch($(this).val()) {
		case 'true':
			$('input[type=text][name=mom_ocupation]').removeAttr('disabled', 'disabled');         
			$('input[type=tel][name=mom_phone_home]').removeAttr('disabled', 'disabled');
			$('input[type=tel][name=mom_phone]').removeAttr('disabled', 'disabled');
			$('input[type=text][name=mom_address]').removeAttr('disabled', 'disabled');         
			break;
		case 'false':
			$('input[type=text][name=mom_ocupation]').attr('disabled', 'disabled');         
			if($('input[type=text][name=mom_ocupation]').val().length>0){
				$('input[type=text][name=mom_ocupation]').val('');
			}
			$('input[type=tel][name=mom_phone_home]').attr('disabled', 'disabled');
			if($('input[type=tel][name=mom_phone_home]').val().length>0){
				$('input[type=tel][name=mom_phone_home]').val('');
			}
			$('input[type=tel][name=mom_phone]').attr('disabled', 'disabled');
			if($('input[type=tel][name=mom_phone]').val().length>0){
				$('input[type=tel][name=mom_phone]').val('');
			}
			$('input[type=text][name=mom_address]').attr('disabled', 'disabled');
			if($('input[type=text][name=mom_address]').val().length>0){
				$('input[type=text][name=mom_address]').val('');
			}
			break;
		}
	});
	$('input[type=radio][name=otherExperiences]').change(function(){
		switch($(this).val()) {
		case 'true':
			$('input[type=text][name=otherExperiences-which]').removeAttr('disabled', 'disabled');
			break;
		case 'false':
			$('input[type=text][name=otherExperiences-which]').attr('disabled', 'disabled');
			if($('input[type=text][name=otherExperiences-which]').val().length>0){
				$('input[type=text][name=otherExperiences-which]').val('');
			}
			break;
		}
	});
	/**
  * Events
  */
	$('#brothersDataSave').click(()=>{
		let brother = pushBrotherOnArray();
		brothers.push(brother);
	});
	$('#formInscription').submit((event)=>{
		event.preventDefault();
		let personal_names=$('input[type=text][name=personal_names]').val();
		let personal_lastnames=$('input[type=text][name=personal_lastnames]').val();
		let personal_dateborn=$('input[type=date][name=personal_dateborn]').val();
		let personal_email=$('input[type=email][name=personal_email]').val();
		let dad_names=$('input[type=text][name=dad_names]').val();
		let mom_names=$('input[type=text][name=mom_names]').val();
		let whoIntiveMe=$('input[type=text][name=whoIntiveMe]').val();
		let whoIntiveMeNumber=$('input[type=tel][name=whoIntiveMeNumber]').val();
		if(personal_names && personal_lastnames && personal_dateborn && personal_email &&
        dad_names && mom_names && whoIntiveMe && whoIntiveMeNumber){
			let data = getDataFromInputs();
			postInscription(data);
		}

	});
	$('#btnCloseReveal').on('click', function() {
		$('#messageResultInscriptionContent').children().remove();
	});
	/**
  * Events
  */

	let getDataFromInputs = ()=>{
		let data = {};
		let current_date=$('input[type=date][name=current_date]').val();
		let gender=$('#gender_male').is(':checked')? 'true': 'false';
		let personal_names=$('input[type=text][name=personal_names]').val();
		let personal_lastnames=$('input[type=text][name=personal_lastnames]').val();
		let personal_dateborn=$('input[type=date][name=personal_dateborn]').val();
		let personal_homephone=$('input[type=tel][name=personal_homephone]').val();
		let personal_mobilephone=$('input[type=tel][name=personal_mobilephone]').val();
		let personal_address=$('input[type=text][name=personal_address]').val();
		let personal_email=$('input[type=email][name=personal_email]').val();
		let personal_profession=$('input[type=text][name=personal_profession]').val();
		let personal_occupation=$('input[type=text][name=personal_occupation]').val();
		data.current_date = current_date;
		data.personal_gender = gender;
		data.personal_names =personal_names;
		data.personal_lastnames = personal_lastnames;
		data.personal_dateborn = personal_dateborn;
		data.personal_homephone = personal_homephone;
		data.personal_mobilephone = personal_mobilephone;
		data.personal_address = personal_address;
		data.personal_email = personal_email;
		data.personal_profession = personal_profession;
		data.personal_occupation = personal_occupation;
		data.life_with_gran = $('#life_with_gran').is(':checked')? 'true': 'false';
		data.life_with_parent = $('#life_with_parent').is(':checked')? 'true': 'false';
		data.life_with_only_mother = $('#life_with_only_mother').is(':checked')? 'true': 'false';
		data.life_with_only_father = $('#life_with_only_father').is(':checked')? 'true': 'false';
		data.life_with_uncles = $('#life_with_uncles').is(':checked')? 'true': 'false';
		data.life_with_friends = $('#life_with_friends').is(':checked')? 'true': 'false';
		data.life_with_cousins = $('#life_with_cousins').is(':checked')? 'true': 'false';
		data.life_with_brothers = $('#life_with_brothers').is(':checked')? 'true': 'false';
		data.life_with_alone = $('#life_with_alone').is(':checked')? 'true': 'false';
		let study=$('#study_yes').is(':checked')? 'true': 'false';
		let study_carrer=$('input[type=text][name=study_carrer]').val();
		let study_where=$('input[type=text][name=study_where]').val();
		data.study = study;
		data.study_carrer = study_carrer;
		data.study_where = study_where;
		let work=$('#work_yes').is(':checked')? 'true': 'false';
		let work_company=$('input[type=text][name=work_company]').val();
		let work_role=$('input[type=text][name=work_role]').val();
		let work_phone=$('input[type=text][name=work_phone]').val();
		data.work = work;
		data.work_company = work_company;
		data.work_role = work_role;
		data.work_phone = work_phone;
		let dad=$('#dad_yes').is(':checked')? 'true': 'false';
		let dad_names=$('input[type=text][name=dad_names]').val();
		let dad_ocupation=$('input[type=text][name=dad_ocupation]').val();
		let dad_phone_home=$('input[type=tel][name=dad_phone_home]').val();
		let dad_phone=$('input[type=tel][name=dad_phone]').val();
		let dad_address=$('input[type=text][name=dad_address]').val();
		data.dad = dad;
		data.dad_names = dad_names;
		data.dad_ocupation = dad_ocupation;
		data.dad_phone_home = dad_phone_home;
		data.dad_phone = dad_phone;
		data.dad_address = dad_address;
		let mom=$('#mom_yes').is(':checked')? 'true': 'false';
		let mom_names=$('input[type=text][name=mom_names]').val();
		let mom_ocupation=$('input[type=text][name=mom_ocupation]').val();
		let mom_phone_home=$('input[type=tel][name=mom_phone_home]').val();
		let mom_phone=$('input[type=tel][name=mom_phone]').val();
		let mom_address=$('input[type=text][name=mom_address]').val();
		data.mom = mom;
		data.mom_names = mom_names;
		data.mom_ocupation = mom_ocupation;
		data.mom_phone_home = mom_phone_home;
		data.mom_phone = mom_phone;
		data.mom_address = mom_address;
    
		let person_mostimportant_name=$('input[type=text][name=person_mostimportant_name]').val();
		let person_mostimportant_number=$('input[type=tel][name=person_mostimportant_number]').val();
		data.person_mostimportant_name = person_mostimportant_name;
		data.person_mostimportant_number = person_mostimportant_number;
    
		let health_illnes=$('input[type=text][name=health-illnes]').val();
		let health_food=$('input[type=text][name=health-food]').val();
		data.health_illnes = health_illnes;
		data.health_food = health_food;
		let health_medicine=$('input[type=text][name=health_medicine]').val();
		let health_eps=$('input[type=text][name=health_eps]').val();
		data.health_medicine = health_medicine;
		data.health_eps = health_eps;
    
		let whoIntiveMe=$('input[type=text][name=whoIntiveMe]').val();
		let whoIntiveMeNumber=$('input[type=tel][name=whoIntiveMeNumber]').val();
		let whyFds=$('input[type=text][name=whyFds]').val();
		let wantFds=$('#wantFds_yes').is(':checked')? 'true': 'false';
		let otherExperiences=$('#otherExperiences_yes').is(':checked')? 'true': 'false';
		let otherExperiences_which=$('input[type=text][name=otherExperiences-which]').val();
		data.whoIntiveMe = whoIntiveMe;
		data.whoIntiveMeNumber = whoIntiveMeNumber;
		data.whyFds = whyFds;
		data.wantFds = wantFds;
		data.otherExperiences = otherExperiences;
		data.otherExperiences_which = otherExperiences_which;
		data.csrfmiddlewaretoken = $('[name=csrfmiddlewaretoken]').val();
		//add brothers array
		data.brothers = JSON.stringify(brothers);
		return data;
	};
  
  
	let pushBrotherOnArray= ()=>{
		let names=$('input[type=text][name=data-brothers-names]');
		let date=$('input[type=date][name=data-brothers-date]');
		let phone=$('input[type=tel][name=data-brothers-phone]');
		let email=$('input[type=email][name=data-brothers-email]');
		let relation=$('select[name=relation] option:selected');
		let relationText=$('select[name=relation] option:selected').text();
		let brother = {};
		if(names!=''&&names!='undefined'&&names!=null){
			brother.names=names.val();
			names.val('');
		} else{
			brother.names='';
		}
		if(date!=''&&date!='undefined'&&date!=null){
			brother.date=date.val();
			date.val('');
		}else{
			brother.date='';
		}
		if(phone!=''&&phone!='undefined'&&phone!=null){
			brother.phone=phone.val();
			phone.val('');
		}else
			brother.phone='';
    
		if(email!=''&&email!='undefined'&&email!=null){
			brother.email=email.val();
			email.val('');
		}else
			brother.email='';

		let relaText='';
		if(relation!=''&&relation!='undefined'&&relation!=null){
			relaText = relationText;
			brother.relation=relation.index()+1;
		}else
			brother.relation='';
		let row = $(addRowOnTable(brother.names, brother.date, brother.phone, brother.email, relaText));
		$('#listBroders > tbody').append(row);
		return brother;
	};

	let addRowOnTable= (names, date, tel, email, relation) =>{
		return `<tr>
              <td>${names}</td>
              <td>${date}</td>
              <td>${tel}</td>
              <td>${email}</td>
              <td>${relation}</td>
          </tr>`;
	};
	let addMesageResultErrorUserExists= (names, email, message) =>{
		return `<h1>Hola ${names}</h1>
            <span>Lo sentimos. ${message} : ${email}</span>`;
	};
	let addMesageResultFail= () =>{
		return `<h1>Algo anda mal</h1>
            <span>Ocurrió un error al intentar realizar la inscripción</span>`;
	};


	/**
   * Create a new inscription
   */
	let postInscription = (data)=>{
		let postAjax = $.ajax({
			url : window.location.href,
			type : 'POST',
			dataType: 'json', // response typ
			data : data
		});
		postAjax.done((data) =>{
			$('#messageResultInscription').foundation('open');
			if (data.result==='ok') {
				let url = `/resultado/?result=${data.result}&message=${data.message}&personal_name=${data.data_register.name}&fds=${data.data_register.fds}&type=inscription`;  
				window.location.href = url;
			} else{
				$('#messageResultInscriptionContent').append($(addMesageResultErrorUserExists(data.data_register.name, data.data_register.email, data.message)));
			}                       
		});
		postAjax.fail(()=>{
			$('#messageResultInscriptionContent').append($(addMesageResultFail()));
		});
	};

});