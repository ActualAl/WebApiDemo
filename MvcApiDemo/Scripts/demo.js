(function ($) {

    var CustomerList = function (el) {
        var self = this;
        self.el = $(el);

        self.setData = function (results) {
            //This shoild build out the results on the el
            console.log(results);
        };
    };

    var DataRepository = function (dataContext) {
        var self = this;

        self.GET_CUSTOMERS_URL = '/Home/GetCustomers';

        self.getCustomers = function () {
            var customersQuery = dataContext.fetch(self.GET_CUSTOMERS_URL);
            return customersQuery;
        };
    };

    var DataContext = function () {
        var self = this;

        self.fetch = function (url) {
            var fetcher = $.get(url).pipe(
                function (response) {
                    return response;
                });
            return fetcher;
        };
    };

    var dataRepository = new DataRepository(new DataContext());
    var customersList = new CustomerList('#customerList');
    dataRepository.getCustomers().then(customersList.setData);
})($);