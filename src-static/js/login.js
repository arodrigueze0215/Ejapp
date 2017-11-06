document.addEventListener("DOMContentLoaded",function(){

    $('#formLogin').on('submit', (ev)=>{
        ev.preventDefault();
        let email=$('input[type=email][name=login_email]').val();
        let password=$('input[type=password][name=login_password]').val();
        let token = $("[name=csrfmiddlewaretoken]").val();
        let data = {
            csrfmiddlewaretoken:token,
            login_email:email,
            login_password:password
        }
        postLogin(data);

    });

    /**
     * Login
     */
    let postLogin = (data) =>{
        console.log(data);
        let postAjax = $.ajax({
            url:'/login/',
            type : 'POST',
            data : data
        });
        postAjax.done((data) =>{
            if (data.result==='ok') {
                window.location = "/"
            } else if(data.result=='error'){
                console.log(data.message);
            }         
            
        });
    }
});
