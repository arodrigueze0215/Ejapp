document.addEventListener("DOMContentLoaded",function(){
  let brothers = [];

   $('input[type=radio][name=study]').change(function(){
       switch($(this).val()) {
         case 'true':
            $('input[type=text][name=study_carrer]').removeAttr('disabled');
            $('input[type=text][name=study_where]').removeAttr('disabled');
             break;
         case 'false':
          $('input[type=text][name=study_carrer]').attr('disabled', 'disabled');
          $('input[type=text][name=study_where]').attr('disabled', 'disabled');
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
          $('input[type=text][name=work_role]').attr('disabled', 'disabled');         
          $('input[type=tel][name=work_phone]').attr('disabled', 'disabled');
             break;
     }
   });
   $('input[type=radio][name=dad]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('input[type=text][name=dad_names]').removeAttr('disabled', 'disabled');         
          $('input[type=text][name=dad_ocupation]').removeAttr('disabled', 'disabled');         
          $('input[type=tel][name=dad_phone_home]').removeAttr('disabled', 'disabled');
          $('input[type=tel][name=dad_phone]').removeAttr('disabled', 'disabled');
          $('input[type=text][name=dad_address]').removeAttr('disabled', 'disabled');         
             break;
         case 'false':
          $('input[type=text][name=dad_names]').attr('disabled', 'disabled');         
          $('input[type=text][name=dad_ocupation]').attr('disabled', 'disabled');         
          $('input[type=tel][name=dad_phone_home]').attr('disabled', 'disabled');
          $('input[type=tel][name=dad_phone]').attr('disabled', 'disabled');
          $('input[type=text][name=dad_address]').attr('disabled', 'disabled');
             break;
     }
   });
    $('input[type=radio][name=mom]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('input[type=text][name=mom_names]').removeAttr('disabled', 'disabled');         
          $('input[type=text][name=mom_ocupation]').removeAttr('disabled', 'disabled');         
          $('input[type=tel][name=mom_phone_home]').removeAttr('disabled', 'disabled');
          $('input[type=tel][name=mom_phone]').removeAttr('disabled', 'disabled');
          $('input[type=text][name=mom_address]').removeAttr('disabled', 'disabled');         
             break;
         case 'false':
          $('input[type=text][name=mom_names]').attr('disabled', 'disabled');         
          $('input[type=text][name=mom_ocupation]').attr('disabled', 'disabled');         
          $('input[type=tel][name=mom_phone_home]').attr('disabled', 'disabled');
          $('input[type=tel][name=mom_phone]').attr('disabled', 'disabled');
          $('input[type=text][name=mom_address]').attr('disabled', 'disabled');
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
             break;
     }
   });
  /**
  * Events
  */
    $('#brothersDataSave').click(()=>{
      let brother = pushBrotherOnArray();
      brothers.push(brother);
      console.log(brothers);
      
      
    });
    $('#registerInscription').click((ev)=>{
      data= getDataFromInputs();
      console.log(data);

    });
  /**
  * Events
  */

  let getDataFromInputs = ()=>{
    data={};
    let personal_names=$('input[type=text][name=personal_names]').val();
    let personal_lastnames=$('input[type=text][name=personal_lastnames]').val();
    let personal_dateborn=$('input[type=date][name=personal_dateborn]').val();
    let personal_homephone=$('input[type=tel][name=personal_homephone]').val();
    let personal_mobilephone=$('input[type=tel][name=personal_mobilephone]').val();
    let personal_address=$('input[type=text][name=personal_address]').val();
    let personal_email=$('input[type=email][name=personal_email]').val();
    data.personal_names = personal_names;
    data.personal_lastnames = personal_lastnames;
    data.personal_dateborn = personal_dateborn;
    data.personal_homephone = personal_homephone;
    data.personal_mobilephone = personal_mobilephone;
    data.personal_address = personal_address;
    data.personal_email = personal_email;
    data.life_with_gran = $('#life_with_gran').is(':checked')? true: false;
    data.life_with_parent = $('#life_with_parent').is(':checked')? true: false;
    data.life_with_only_mother = $('#life_with_only_mother').is(':checked')? true: false;
    data.life_with_only_father = $('#life_with_only_father').is(':checked')? true: false;
    data.life_with_uncles = $('#life_with_uncles').is(':checked')? true: false;
    data.life_with_friends = $('#life_with_friends').is(':checked')? true: false;
    data.life_with_cousins = $('#life_with_cousins').is(':checked')? true: false;
    data.life_with_brothers = $('#life_with_brothers').is(':checked')? true: false;
    data.life_with_alone = $('#life_with_alone').is(':checked')? true: false;
    let study=$('input[type=radio][name=study]').val();
    let study_carrer=$('input[type=text][name=study_carrer]').val();
    let study_where=$('input[type=text][name=study_where]').val();
    data.study = study;
    data.study_carrer = study_carrer;
    data.study_where = study_where;
    let work=$('input[type=radio][name=work]').val();
    let work_company=$('input[type=text][name=work_company]').val();
    let work_role=$('input[type=text][name=work_role]').val();
    let work_phone=$('input[type=text][name=work_phone]').val();
    data.work_company = work_company;
    data.work_role = work_role;
    data.work_phone = work_phone;
    let dad=$('input[type=radio][name=dad]').val();
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
    let mom=$('input[type=radio][name=mom]').val();
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
    
    //add brothers array
    data.brothers = brothers;
    
    let health_illnes=$('input[type=text][name=health-illnes]').val();
    let health_food=$('input[type=text][name=health-food]').val();
    data.health_illnes = health_illnes;
    data.health_food = health_food;
    
    let whoIntiveMe=$('input[type=text][name=whoIntiveMe]').val();
    let whoIntiveMeNumber=$('input[type=tel][name=whoIntiveMeNumber]').val();
    let whyFds=$('input[type=text][name=whyFds]').val();
    let wantFds=$('input[type=radio][name=wantFds]').val();
    let otherExperiences=$('input[type=radio][name=otherExperiences]').val();
    let otherExperiences_which=$('input[type=text][name=otherExperiences-which]').val();
    data.whoIntiveMe = whoIntiveMe;
    data.whoIntiveMeNumber = whoIntiveMeNumber;
    data.whyFds = whyFds;
    data.wantFds = wantFds;
    data.otherExperiences = otherExperiences;
    data.otherExperiences_which = otherExperiences_which;
    return data;
  }


   let pushBrotherOnArray= ()=>{
    let names=$('input[type=text][name=data-brothers-names]').val();
    let date=$('input[type=date][name=data-brothers-date]').val();
    let phone=$('input[type=tel][name=data-brothers-phone]').val();
    let email=$('input[type=email][name=data-brothers-email]').val();
    let brother = {};
    if(names!=''&&names!='undefined'&&names!=null){
      brother.names=names;
    } else{
      brother.names='';
    }
    if(date!=''&&date!='undefined'&&date!=null){
      brother.date=date;
    }else{
      brother.date='';
    }
    if(phone!=''&&phone!='undefined'&&phone!=null){
      brother.phone=phone;
    }else
      brother.phone='';
    
    if(email!=''&&email!='undefined'&&email!=null){
      brother.email=email;
    }else
      brother.email='';
    let row = $(addRowOnTable(brother.names, brother.date, brother.phone, brother.email));
    $('#listBroders > tbody').append(row);
    return brother;
   }

   let addRowOnTable= (names, date, tel, email) =>{
     return `<tr>
                <td>${names}</td>
                <td>${date}</td>
                <td>${tel}</td>
                <td>${email}</td>
            </tr>`
   }

   /**
     * Connection AJAX to backend
     */
        /**
         * Create a new inscription
         */
        let postNewFds = (data) =>{
          let postAjax = $.ajax({
              url : window.location.href,
              type : 'POST',
              data : data
          });
          postAjax.done((data) =>{
              if (data.result==='ok') {
                console.log(data);
              } else{
                  console.log(data);
              }         
              
          });
      }



})