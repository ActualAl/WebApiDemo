(function ($) {

    var listElement = $('#customerList');

    $.get('/api/customers', function (data) {
        for (var i = 0 ; i < data.length; i++) {
            var item = data[i];
            var elem = $('<li>', { text: item.Forename + ' ' + item.Surname });
            elem.on('click', { id: item.Id }, function (event) {
                var id = event.data.id;
                $.get('/api/customers/' + id, function (cData) {
                    alert(cData.Forename + ' ' + cData.Surname);
                }).fail(function (err) { alert('/api/customers/' + item.Id + ' failed with status: ' + err.status); });
            });
            elem.appendTo(listElement);
        };
    }).fail(function (err) { alert('/api.customers/' + ' failed with status: ' + err.status); });
})($)