import * as csrf from './csrftoken.js';
document.addEventListener("DOMContentLoaded",function(){
    var csrftoken = csrf.csrfToken('csrftoken');
    
    $('#listFdsTable').DataTable({
        "language": { 
            "decimal":        "",
            "emptyTable":     "Ningun Fds creado en esta tabla",
            "info":           "Mostrando _START_ a _END_ de _TOTAL_ en total",
            "infoEmpty":      "Mostrando 0 a 0 de 0 en total",
            "infoFiltered":   '(filtered from _MAX_ total entries)',
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     " _MENU_ ",
            "loadingRecords": "Cargando...",
            "processing":     "Procesando...",
            "search":         "",
            "searchPlaceholder": "Buscar",
            "zeroRecords":    "No se encontraron resultados",
            "paginate": {
                "first":      "Primero",
                "last":       "último",
                "next":       "siguiente",
                "previous":   "anterior"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
    });
    addButtonNew();
    function addButtonNew() {
        let btn = $(`<button id="openFormNewFds" type="button" class="button listFds__actions__new">Nuevo FDS</button>`);
        $('#listFdsTable_wrapper').prepend(btn);

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

    /**
     * Event that set a post to enable a isncription form
     */
    $('#listFdsTable').on('click','li.listFds__menuAction__enable', (ev)=>{
        ev.preventDefault();
        var id = $(ev.currentTarget).parent().data('row-id');
        enableInscription(id, "True");
    });
    
    /**
     * Event that set a post to disable a isncription form
     */
    $('#listFdsTable').on('click','li.listFds__menuAction__disable', (ev)=>{
        ev.preventDefault();
        var id = $(ev.currentTarget).parent().data('row-id');
        enableInscription(id, "False");
    });

    /**
     * Event that set a delete fds from the list
     */
    $('#listFdsTable').on('click','li.listFds__menuAction__delete', (ev)=>{
        ev.preventDefault();
        var id = $(ev.currentTarget).parent().data('row-id');
        console.log(`Delete: ${id}`);
    });
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
            postAjax.done((data) =>{
                if (data.result==='ok') {
                    location.reload();
                } else{
                    console.log(data);
                }         
                
            });
        }

        /**
         * Enable inscription form for each FDS
         * @param {*Fds id} id 
         * @param {* it could be True o False to enable the inscription Form} enable 
         */
        let enableInscription = (id, enable) =>{
            let data = {is_form: enable, fds_id:id, csrfmiddlewaretoken: csrftoken};
            let postAjax = $.ajax({
                url : '/formenable/',
                type : 'POST',
                data : data
            });
            postAjax.done((data) =>{
                if (data.result==='ok') {
                    location.reload();
                } else{
                    console.log(data);
                }         
                
            });
        }
    /**
     * Connection AJAX to backend
     */
});