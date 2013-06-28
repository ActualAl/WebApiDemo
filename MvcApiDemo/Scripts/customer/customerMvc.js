var CustomersController = function (dependencies) {
    var self = this;
    var customerRepository = dependencies.customerRepository;
    var errorHandler = dependencies.errorHandler;
    var customersView = dependencies.customersView;

    self.loadCustomers = function () {
        customerRepository.getCustomers().then(customersView.showCustomers, errorHandler.handleApiError);
    }

    self.loadCustomerById = function (id) {
        customerRepository.getCustomerById(id).then(customersView.showCustomer, errorHandler.handleApiError);
    }
};

var CustomersView = function (listElementId) {
    var self = this;

    self.listElement = listElementId;

    function formatItem(item) {
        return item.Forename + ' ' + item.Surname;
    }

    self.showCustomers = function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var elem = $('<li>', { text: formatItem(item) });
            elem.on('click', { id: item.Id }, function (event) {
                $(document).trigger('loadCustomer', [event.data.id]);
            });
            elem.appendTo(self.listElement);
        };
    };

    self.showCustomer = function (data) {
        alert(data.Forename + ' ' + data.Surname);
    };
};

var CustomerRepository = function (dataContext) {
    var self = this;

    self.getCustomers = function () {
        return dataContext.fetch('/api/customers');
    };

    self.getCustomerById = function (id) {
        return dataContext.fetch('/api/customers/' + id);
    };
};