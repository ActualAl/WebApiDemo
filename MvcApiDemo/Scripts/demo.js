(function ($) {

    var CustomersController = function (dependencies) {
        var self = this;
        var dataRepository = dependencies.dataRepository;
        var errorHandler = dependencies.errorHandler;
        var customersView = dependencies.customersView;

        self.loadCustomers = function () {
            dataRepository.getCustomers().then(customersView.showCustomers, errorHandler.handleApiError);
        }

        self.loadCustomerById = function (id) {
            dataRepository.getCustomerById(id).then(customersView.showCustomer, errorHandler.handleApiError);
        }
    };

    var CustomersView = function (listElementId) {
        var self = this;

        var listElement = $(listElementId);

        function formatItem(item) {
            return item.Forename + ' ' + item.Surname;
        }

        self.showCustomers = function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var elem = $('<li>', { text: formatItem(item) });
                elem.on('click', {id: item.Id}, function (event) {
                    console.log('custId: ' + event.data.id);
                    $(document).trigger('loadCustomer', [event.data.id]);
                });
                elem.appendTo(listElement);
            };
        };

        self.showCustomer = function (data) {
            alert(data.Forename + ' ' + data.Surname);
        };
    }

    var DataRepository = function (dataContext) {
        var self = this;

        self.getCustomers = function () {
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

    
    var dataClient = new DataClient();
    var customersController = new CustomersController({
        errorHandler: new ErrorHandler(),
        dataRepository: new DataRepository(dataClient),
        customersView: new CustomersView('#customerList')
    });
    $(document).on('loadCustomer', function (evt, id) {
        customersController.loadCustomerById(id);
    });
    customersController.loadCustomers();
})($);