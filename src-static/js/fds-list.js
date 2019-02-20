import * as csrf from './libs/csrftoken.js';
let $ = window.$ = window.jQuery= require('jquery');
let moment = require('moment');
require('datatables.net');
require('./libs/datetime.js');
require('./libs/datetime-moment.js');
require('./libs/foundation.min.js');
require('foundation-datepicker');
window.moment = moment;
$(document).foundation();
document.addEventListener('DOMContentLoaded',function(){
	let csrftoken = csrf.csrfToken('csrftoken');  
	let listFdsTable;
	let btnNewFds = null;
	if ( $.fn.dataTable.isDataTable('#listFdsTable')) {
		listFdsTable = $('#listFdsTable').DataTable();
	}
	else {
		listFdsTable = $('#listFdsTable').DataTable({
			'columns': [
				null,
				null,
				null,
				null,
				null,
				{ 'orderable': false },
			],
			'columnDefs': [
				{ 
					targets: 2,
					render: $.fn.dataTable.render.moment('MMM DD, YYYY','MMMM DD, YYYY')
				},
				{ 
					targets: 3,
					render: $.fn.dataTable.render.moment('MMM DD, YYYY','MMMM DD, YYYY')
				},
				{
					targets:5,
					orderable: false,
					serchable:false
				}
			],
			'initComplete': ()=>{
				addButtonNew();
			},
			'scrollX': false,
			'language': { 
				'decimal':        '',
				'emptyTable':     'Ningun Fds creado en esta tabla',
				'info':           'Mostrando _START_ a _END_ de _TOTAL_ en total',
				'infoEmpty':      'Mostrando 0 a 0 de 0 en total',
				'infoFiltered':   '(filtered from _MAX_ total entries)',
				'infoPostFix':    '',
				'thousands':      ',',
				'lengthMenu':     ' _MENU_ ',
				'loadingRecords': 'Cargando...',
				'processing':     'Procesando...',
				'search':         '',
				'searchPlaceholder': 'Buscar',
				'zeroRecords':    'No se encontraron resultados',
				'paginate': {
					'first':      'Primero',
					'last':       'último',
					'next':       'siguiente',
					'previous':   'anterior'
				},
				'aria': {
					'sortAscending':  ': activate to sort column ascending',
					'sortDescending': ': activate to sort column descending'
				}
			}
		});
	}  
    
   
	function addButtonNew() {
		if (btnNewFds==null) {
			btnNewFds = $('<button id="openFormNewFds" type="button" class="button listFds__actions__new">Nuevo FDS</button>');
		}
		$('#listFdsTable_wrapper').prepend(btnNewFds);            

	}
	/**Events */
	$('#openFormNewFds').on('click', ()=>{
		$('#newFdsModal').foundation('open');
	});
	$('#postNewFds').on('submit', (ev)=>{
		ev.preventDefault();
		let data = $('#postNewFds').serialize();
		postNewFds(data);
	});
	$('#putNewFds').on('submit', (ev)=>{
		ev.preventDefault();
		let data = $('#putNewFds').serialize();
		putNewFds(data);
	});
    
	/**
     * Event that set a post to enable a isncription form
     */
	listFdsTable.on('click','li.listFds__menuAction__enable', (ev)=>{
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		enableInscription(id, 'True', ev);
	});
    
	/**
     * Event that set a post to disable a isncription form
     */
	listFdsTable.on('click','li.listFds__menuAction__disable', (ev)=>{
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		enableInscription(id, 'False', ev);
	});
	listFdsTable.on('click','td.listFds__getUrl', (ev)=>{
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		getUrlInscription(id, ev);
	});
	listFdsTable.on('touch','td.listFds__getUrl', (ev)=>{
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		getUrlInscription(id, ev);
	});
    
	/**
     * Event that set a post to edit a isncription form
     */
	listFdsTable.on('click','li.listFds__menuAction__edit', (ev)=>{
		$('#updateFdsModal').foundation('open');
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		let numberfds = $(ev.currentTarget).parent().data('row-numberfds');
		let name = $(ev.currentTarget).parent().data('row-name');
		let datestart = $(ev.currentTarget).parent().data('row-datestart');
		let dateend = $(ev.currentTarget).parent().data('row-dateend');
		$('#putNewFds > input[name=id_fds]').val(id);
		$('#putNewFds > label > input[name=name_fds]').val(name);
		$('#putNewFds > label > input[name=number_fds]').val(numberfds);
		$('#putNewFds > label > input[name=startdate_fds]').val(datestart);
		$('#putNewFds > label > input[name=enddate_fds]').val(dateend);
	});

	/**
     * Event that set a delete fds from the list
     */
	listFdsTable.on('click','li.listFds__menuAction__delete', (ev)=>{
		ev.preventDefault();
		let id = $(ev.currentTarget).parent().data('row-id');
		let content = `<p class="lead" data-id="${id}">¿Estas seguro que deseas eliminar este FDS?</p>`;
		$('#deleteFds_content').append($(content));
		$('#deleteFds').foundation('open');
	});
	/**
     * Event that go inscribed list
     */
	listFdsTable.on('click','li.listFds__menuAction__listInscribed', (ev)=>{
		ev.preventDefault();
		let fds = $(ev.currentTarget).parent().data('row-fds');
		let city = $(ev.currentTarget).parent().data('row-city');
		let url = window.location.origin;
		url = `${url}/inscritos/lista/?fds=${fds};city=${city}`;

		window.location.href = url;
	});
    
	$('button[type=button][name=delete_fds]').on('click', function() {
		let id =$('#deleteFds_content').children().eq(0).data('id');
		deleteFds(id);
	});
	$('button[type=button][name=cancel_delete]').on('click', function() {
		$('#deleteFds_content').children().remove();
	});

	$('#navEj__hamburgers').on('click', ()=>{
		$('#menuSlide').toggleClass('menuSlide--active');
	});
	$('#navEj__hamburgers').on('touch', ()=>{
		$('#menuSlide').toggleClass('menuSlide--active');
	});
	$('#userAuthenticated').on('click', ()=>{
		$('.menuSlide__content__listItem__myProfile').toggleClass('menuSlide__content__listItem__item--active');
		$('.menuSlide__content__listItem__logout').toggleClass('menuSlide__content__listItem__item--active');
	});
	$('#userAuthenticated').on('touch', ()=>{
		$('.menuSlide__content__listItem__myProfile').toggleClass('menuSlide__content__listItem__item--active');
		$('.menuSlide__content__listItem__logout').toggleClass('menuSlide__content__listItem__item--active');
	});

	hideColumnsResponsive();
    
	/**Events */

	/**
     * Connection AJAX to backend
     */
	/**
         * Create a new Fds 
         */
	let postNewFds = (data) =>{
		let postAjax = $.ajax({
			url : window.location.href,
			type : 'POST',
			data : data
		});
		postAjax.done((response) =>{
			if (response.result==='ok') {
				$('#newFdsModal').foundation('close');
				location.reload();
			}
		});
            
	};

	/**
         * Enable inscription form for each FDS
         * @param {*Fds id} id 
         * @param {* it could be True o False to enable the inscription Form} enable 
         */
	let enableInscription = (id, enable, ev) =>{
		let data = {is_form: enable, fds_id:id, csrfmiddlewaretoken: csrftoken};
		let postAjax = $.ajax({
			url : '/formenable/',
			type : 'POST',
			data : data
		});
		postAjax.done((response) =>{
			if (response.result==='ok') {
				if(response.active==='true'){
					$(`#listFdsTableRow${id}`).children().eq(4).children().removeClass('secondary').addClass('success');                        
					$(`#listFdsTableRow${id}`).children().eq(4).children().text('Habilitado');
					$(ev.currentTarget).children().text('Deshabilitar inscripción');
					$(ev.currentTarget).removeClass('listFds__menuAction__enable').addClass('listFds__menuAction__disable');
					$('#copyUrlInscription').foundation('open');
					$('input[type=url][name=urlInscription]').val(response.url);
				}
				else{
					$(`#listFdsTableRow${id}`).children().eq(4).children().removeClass('success').addClass('secondary');
					$(`#listFdsTableRow${id}`).children().eq(4).children().text('Deshabilitado');
					$(ev.currentTarget).children().text('habilitar inscripción');
					$(ev.currentTarget).removeClass('listFds__menuAction__disable').addClass('listFds__menuAction__enable');

				}
			}
		});
	};
	/**
         * Get url of inscriptions to share with anyone
         * @param {*id fds} id 
         * @param {* event } ev 
         */
	let getUrlInscription = (id) =>{
		let data = {fds_id:id, csrfmiddlewaretoken: csrftoken};
		let postAjax = $.ajax({
			url : '/geturl/',
			type : 'POST',
			data : data
		});
		postAjax.done((response) =>{
			if (response.result==='ok') {
				$('#copyUrlInscription').foundation('open');
				$('input[type=url][name=urlInscription]').val(response.url);
			}
		});
	};

	let deleteFds = (id) =>{
		let data = {csrfmiddlewaretoken: csrftoken, id_fds:id, method:'DELETE'};
		let deleteAjax = $.ajax({
			type : 'POST',
			data : data
		});
		deleteAjax.done((response) =>{
			if (response.result==='ok') {
				location.reload();
			}
		});
	};
	/**
         * Create a new Fds 
         */
	let putNewFds = (data) =>{
		let putAjax = $.ajax({
			type : 'POST',
			data : data
		});
		putAjax.done((response) =>{
			if (response.result==='ok') {
				location.reload();
			}
		});
	};
	/**
     * Connection AJAX to backend
     */

	function hideColumnsResponsive(){
		let width800 = window.matchMedia(window.maxWidth800);
		if (width800.matches)listFdsTable.column(1).visible(false);
        
		width800.addListener(()=>{
			let query = width800.matches;
			let col = listFdsTable.column(1);
			col.visible(!query);
		});
		let width640 = window.matchMedia(window.maxWidth640);
		if (width640.matches){
			listFdsTable.column(3).visible(false);
		}
		width640.addListener(()=>{
			let query = width640.matches;
			let dateEnd = listFdsTable.column(3);
			dateEnd.visible(!query);
		});
		let width480 = window.matchMedia(window.maxWidth480);
		if (width480.matches){
			listFdsTable.column(2).visible(false);
		}
		width480.addListener(()=>{
			let query = width480.matches;
			let dateInit = listFdsTable.column(2);
			dateInit.visible(!query);
		});
	}
});