(function ($) {
    var CustomerPage = window.CustomerPage = function () {
        var dataClient = new DataClient();
        var customersController = new CustomersController({
            errorHandler: new ErrorHandler(),
            customerRepository: new CustomerRepository(dataClient),
            customersView: new CustomersView($('#customerList')),
            document : document
        });
        customersController.loadCustomers();
    };
})($);