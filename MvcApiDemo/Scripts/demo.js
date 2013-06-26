(function ($) {

    var CustomerList = function (el) {
        var self = this;
        self.el = $(el);

        self.setData = function (results) {
            console.log(results);
        };
    };

    var DataRepository = function (dataContext) {
        var self = this;

        self.getCustomers = function () {
            var customersQuery = dataContext.fetch('/Home/GetCustomers');
            return customersQuery;
        };
    };

    var DataClient = function () {
        var self = this;

        var response = function (r) {
            return r;
            if (r.Success == true) {
                return r;
            }
        };

        self.fetch = function (url) {
            return $.get(url).pipe(response);
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
    var customersList = new CustomerList('#customerList');
    dataRepository.getCustomers().then(customersList.setData, errorHanlder.handleApiError);
})($);