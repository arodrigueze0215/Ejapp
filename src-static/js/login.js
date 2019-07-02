const $ = window.$ = window.jQuery= require('jquery');
document.addEventListener('DOMContentLoaded',function(){

	$('#formLogin').on('submit', (ev)=>{
		ev.preventDefault();
		let email=$('input[type=email][name=login_email]').val();
		let password=$('input[type=password][name=login_password]').val();
		let token = $('[name=csrfmiddlewaretoken]').val();
		let data = {
			csrfmiddlewaretoken:token,
			login_email:email,
			login_password:password
		};
		postLogin(data);

	});

	/**
     * Login
     */
	let postLogin = (data) =>{
		let postAjax = $.ajax({
			url:'/login/',
			type : 'POST',
			data : data
		});
		postAjax.done((data) =>{
			console.log(data)
			if (data.result==='ok' && data.is_adviser) window.location = '/fds/';
			else window.location = '/encontrado/detalle';
		});
	};
});
