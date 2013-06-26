(function ($) {

    var CustomersController = function (el) {
        var self = this;
        self.el = $(el);

        function formatItem (item) {
            return item.Forename + ' ' + item.Surname;
        }

        self.showCustomers = function (data) {
            console.log(data);
            $.each(data, function (key, item) {
                $('<li>', { text: formatItem(item)}).appendTo(self.el);
            });
        };

        self.showCustomer = function (data) {
            alert(data.Forename + ' ' + data.Surname);
            //console.log(data);
        };
    };

    var DataRepository = function (dataContext) {
        var self = this;

        self.getCustomers = function () {
            //var customersQuery = dataContext.fetch('/Home/GetCustomers');
            var customersQuery = dataContext.fetch('/api/customers');
            return customersQuery;
        };

        self.getCustomerById = function (id) {
            var customerQuery = dataContext.fetch('/api/customers/' + id);
            return customerQuery;
        };
    };

    var DataClient = function () {
        var self = this;

        var reply = function (r) {
            return r;
        };

        self.fetch = function (url) {
            return $.get(url).then(reply)
        };
    };

    var ErrorHandler = function () {
        var self = this;

        self.handleApiError = function (details) {
            console.log(this.url + ' failed with status: ' + details.status);
        };
    };

    var errorHanlder = new ErrorHandler();
    var dataRepository = new DataRepository(new DataClient());
    var customersController = new CustomersController('#customerList');
    dataRepository.getCustomers().then(customersController.showCustomers, errorHanlder.handleApiError);
    dataRepository.getCustomerById(1).then(customersController.showCustomer, errorHanlder.handleApiError);
})($);