
function initDatatable(params) {
    let inscriptionList = $('#inscriptionList');
    inscriptionList.DataTable({
        "columns": [
            null,
            null,
            null,
            null,
            { "orderable": false },
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
}
export default initDatatable;