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
      data={};

    });
  /**
  * Events
  */


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