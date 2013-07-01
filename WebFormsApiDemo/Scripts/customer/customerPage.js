(function ($) {
    var CustomerPage = window.CustomerPage = function () {
        var dataClient = new DataClient();
        var customersController = new CustomersController({
            errorHandler: new ErrorHandler(),
            customerRepository: new CustomerRepository(dataClient),
            customersView: new CustomersView($('#customerList'))
        });
        $(document).on('loadCustomer', function (evt, id) {
            customersController.loadCustomerById(id);
        });
        customersController.loadCustomers();
    };
})($);