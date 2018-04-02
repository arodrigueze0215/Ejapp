
function initDatatable(params) {

    let inscriptionList = $('#inscriptionList');
    inscriptionList= $('#inscriptionList').DataTable({
        "columnDefs": [
            { 
                targets: 1,
                render: $.fn.dataTable.render.moment('MMMM Do YYYY','MMMM DD, YYYY')
            },
            {
                targets:4,
                orderable: false,
                serchable:false
            }
        ],
        "scrollX": false,
        "language": { 
            "decimal":        "",
            "emptyTable":     "Ningun Inscrito aún",
            "info":           "Mostrando _START_ a _END_ de _TOTAL_ en total",
            "infoEmpty":      "Mostrando 0 a 0 de 0 en total",
            "infoFiltered":   '(filtered from _MAX_ total entries)',
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     " _MENU_ ",
            "loadingRecords": "Cargando...",
            "processing":     "Procesando...",
            "search":         "",
            "searchPlaceholder": "Buscar...",
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
    hideColumnsResponsive();
    function hideColumnsResponsive(){
        var width900 = window.matchMedia(maxWidth900);
        if (width900.matches)inscriptionList.column(3).visible(false);
        
        width900.addListener(()=>{
            let query = width900.matches;
            let col = inscriptionList.column(3);
            col.visible(!query);
        });
        var width800 = window.matchMedia(maxWidth800);
        if (width800.matches){
            inscriptionList.column(1).visible(false);
        }
        width800.addListener(()=>{
            let query = width800.matches;
            let dateEnd = inscriptionList.column(1);
            dateEnd.visible(!query);
        });
        var width480 = window.matchMedia(maxWidth480);
        if (width480.matches){
            inscriptionList.column(2).visible(false);
        }
        width480.addListener(()=>{
            let query = width480.matches;
            let dateInit = inscriptionList.column(2);
            dateInit.visible(!query);
        });
     }
}
export default initDatatable;