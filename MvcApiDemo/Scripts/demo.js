(function ($) {

    var CustomerList = function (el) {
        var self = this;
        self.el = $(el);

        self.setData = function (results) {
            //This shoild build out the results on the el
            console.log(results);
        };
    }

    var DataRepository = function () {

        var self = this;

        self.GET_CUSTOMERS_URL = '/Home/GetCustomers';

        self.context;

        var initContext = function () {
            self.context = new DataContext();
        }

        var disposeContext = function () {
            self.context = undefined;
        }
        
        self.getCustomers = function () {
            initContext();
            var customers = self.context.fetch(self.GET_CUSTOMERS_URL);
            disposeContext();
            return customers;
        };
    };

    var DataContext = function () {
        var self = this;

        self.fetch = function (url) {
            $.get(url).then(
                function (response) {
                    return response;
                },
                function () {
                    return {};
                })
        };
    }

    var dataRepository = new DataRepository();
    var customersList = new CustomerList('#customerList');
    dataRepository.getCustomers().then(customersList.setData());
    //customersList.setData(customers);
})($);