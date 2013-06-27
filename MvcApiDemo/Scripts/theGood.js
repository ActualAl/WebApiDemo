(function ($) {
    //<View Specific>
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

    var CustomerRepository = function (dataContext) {
        var self = this;

        self.getCustomers = function () {
            return dataContext.fetch('/api/customers');
        };

        self.getCustomerById = function (id) {
            return dataContext.fetch('/api/customers/' + id);
        };
    };
    //</View Specific>

    //<Re-usable>
   

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

    //</Re-usable>

    
    var dataClient = new DataClient();
    var customersController = new CustomersController({
        errorHandler: new ErrorHandler(),
        customerRepository: new CustomerRepository(dataClient),
        customersView: new CustomersView('#customerList')
    });
    $(document).on('loadCustomer', function (evt, id) {
        customersController.loadCustomerById(id);
    });
    customersController.loadCustomers();
})($);