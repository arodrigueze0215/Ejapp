$(function (){ 

   $('input[type=radio][name=study]').change(function(){
       switch($(this).val()) {
         case 'true':
            $('#career').removeAttr('disabled');
            $('#institute').removeAttr('disabled');
             break;
         case 'false':
          $('#career').attr('disabled', 'disabled');
          $('#institute').attr('disabled', 'disabled');
             break;
     }
   });
    $('input[type=radio][name=job]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('#company').removeAttr('disabled');         
          $('#role').removeAttr('disabled');         
          $('#phone-company').removeAttr('disabled');         
             break;
         case 'false':
          $('#company').attr('disabled', 'disabled');         
          $('#role').attr('disabled', 'disabled');         
          $('#phone-company').attr('disabled', 'disabled');
             break;
     }
   });
})