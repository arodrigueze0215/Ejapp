document.addEventListener("DOMContentLoaded",function(){
    
    $('#listFdsTable').DataTable({
        "language": { 
            "decimal":        "",
            "emptyTable":     "Ningun Fds creado en esta tabla",
            "info":           "Mostrando _START_ a _END_ de _TOTAL_ en total",
            "infoEmpty":      "Mostrando 0 a 0 de 0 en total",
            "infoFiltered":   "(filtered from _MAX_ total entries)",
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
    /**Events */

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
});