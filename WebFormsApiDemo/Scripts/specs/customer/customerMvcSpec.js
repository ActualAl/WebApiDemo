/// <reference path="../../jquery.js" />
/// <reference path="../../customer/customerMvc.js" />
describe("js CustomersController", function () {
    var _tObj;
    var dependencies;

    afterEach(function () {
        _tObj = undefined;
        dependencies = undefined;
    });

    describe("contsructor", function () {
        it("creates object", function () {
            //Given
            dependencies = {
                customerRepository: {},
                errorHandler: {},
                customersView: {}
            };
            //When
            _tObj = new CustomersController(dependencies);

            //Then
            expect(_tObj).not.toBe(undefined);
        });

        it("sets up loadCustomer listener to call 'loadCustomer'", function () {
            //Given

            var stubRepository = {
                getCustomerById: function (id) {
                    return [];
                }
            };

            dependencies = {
                customerRepository: stubRepository,
                errorHandler: {},
                customersView: {
                    showCustomer: function () { }
                },
                document: {}
            };

            spyOn(stubRepository, "getCustomerById").andCallFake(function (req) {
                var stubDeferred = $.Deferred();
                stubDeferred.resolve();
                return stubDeferred.promise();
            });

            //When
            _tObj = new CustomersController(dependencies);
            $(dependencies.document).trigger('loadCustomer', 1);

            //Then
            expect(stubRepository.getCustomerById).toHaveBeenCalled();

        });
    });

    describe("function", function () {
        describe("loadCustomers", function () {
            it("calls getCustomers and then handleApiError on fail", function () {
                //Given
                var stubCustomersRepository = {
                    getCustomers: function () { }
                };
                var stubCustomersView = {
                    showCustomers: function () { }
                };
                var stubErrorHandler = {
                    handleApiError: function () { }
                };

                var dependencies = {
                    customerRepository: stubCustomersRepository,
                    errorHandler: stubErrorHandler,
                    customersView: stubCustomersView
                };

                spyOn(stubCustomersRepository, "getCustomers").andCallFake(function (req) {
                    var stubDeffered = $.Deferred();
                    stubDeffered.reject();//This rejection should cause the second 'then' parameter to be called
                    return stubDeffered.promise();
                });

                spyOn(stubErrorHandler, "handleApiError");
                spyOn(stubCustomersView, "showCustomers");

                //When
                _tObj = new CustomersController(dependencies);
                _tObj.loadCustomers();

                //Then
                expect(stubCustomersRepository.getCustomers).toHaveBeenCalled();
                expect(stubErrorHandler.handleApiError).toHaveBeenCalled();
                expect(stubCustomersView.showCustomers).not.toHaveBeenCalled();
            });
        });

        describe("loadCustomers", function () {
            it("calls getCustomers and then showCustomers on success", function () {
                //Given
                var stubCustomersRepository = {
                    getCustomers: function () { }
                };
                var stubCustomersView = {
                    showCustomers: function () { }
                };
                var stubErrorHandler = {
                    handleApiError: function () { }
                };

                var dependencies = {
                    customerRepository: stubCustomersRepository,
                    errorHandler: stubErrorHandler,
                    customersView: stubCustomersView
                };

                spyOn(stubCustomersRepository, "getCustomers").andCallFake(function (req) {
                    var stubDeffered = $.Deferred();
                    stubDeffered.resolve();//This resolve should cause the first 'then' parameter to be called
                    return stubDeffered.promise();
                });

                spyOn(stubErrorHandler, "handleApiError");
                spyOn(stubCustomersView, "showCustomers");

                //When
                _tObj = new CustomersController(dependencies);
                _tObj.loadCustomers();

                //Then
                expect(stubCustomersRepository.getCustomers).toHaveBeenCalled();
                expect(stubErrorHandler.handleApiError).not.toHaveBeenCalled();
                expect(stubCustomersView.showCustomers).toHaveBeenCalled();
            });
        });

        describe("loadCustomerById", function () {
            it("calls getCustomerById and then handleApiError on fail", function () {
                //Given
                var stubCustomersRepository = {
                    getCustomerById: function () { }
                };
                var stubCustomersView = {
                    showCustomer: function (id) { }
                };
                var stubErrorHandler = {
                    handleApiError: function () { }
                };

                var dependencies = {
                    customerRepository: stubCustomersRepository,
                    errorHandler: stubErrorHandler,
                    customersView: stubCustomersView
                };

                spyOn(stubCustomersRepository, "getCustomerById").andCallFake(function (req) {
                    var stubDeffered = $.Deferred();
                    stubDeffered.reject();//This rejection should cause the second 'then' parameter to be called
                    return stubDeffered.promise();
                });

                spyOn(stubErrorHandler, "handleApiError");
                spyOn(stubCustomersView, "showCustomer");

                var id = 90210;

                //When
                _tObj = new CustomersController(dependencies);
                _tObj.loadCustomerById(id);

                //Then
                expect(stubCustomersRepository.getCustomerById).toHaveBeenCalled();
                expect(stubErrorHandler.handleApiError).toHaveBeenCalled();
                expect(stubCustomersView.showCustomer).not.toHaveBeenCalled();
            });
        });

        describe("loadCustomerById", function () {
            it("calls getCustomerById and then showCustomer on success", function () {
                //Given
                var stubCustomersRepository = {
                    getCustomerById: function () { }
                };
                var stubCustomersView = {
                    showCustomer: function () { }
                };
                var stubErrorHandler = {
                    handleApiError: function () { }
                };

                var dependencies = {
                    customerRepository: stubCustomersRepository,
                    errorHandler: stubErrorHandler,
                    customersView: stubCustomersView
                };

                spyOn(stubCustomersRepository, "getCustomerById").andCallFake(function (req) {
                    var stubDeffered = $.Deferred();
                    stubDeffered.resolve();//This resolve should cause the first 'then' parameter to be called
                    return stubDeffered.promise();
                });

                spyOn(stubErrorHandler, "handleApiError");
                spyOn(stubCustomersView, "showCustomer");

                var id = 90210

                //When
                _tObj = new CustomersController(dependencies);
                _tObj.loadCustomerById(id);

                //Then
                expect(stubCustomersRepository.getCustomerById).toHaveBeenCalled();
                expect(stubErrorHandler.handleApiError).not.toHaveBeenCalled();
                expect(stubCustomersView.showCustomer).toHaveBeenCalled();
            });
        });

    });

});

describe("js CustomersView", function () {
    var _tObj;

    afterEach(function () {
        _tObj = undefined;
    });

    describe("constructor", function () {
        it("creates object", function () {
            //Given
            var el = "#anElement";

            //When
            _tObj = new CustomersView(el);

            //Then
            expect(_tObj).not.toBe(undefined);
        });
    });

    describe("function", function () {

        var el;
        var data;

        beforeEach(function () {
            el = $("<ul id='#anElement'></ul>");
            _tObj = new CustomersView(el);
            data = undefined;
        });

        describe("showCustomers", function () {
            it("builds customer list", function () {
                //Given
                data = [
                    { Id: 1, Forename: "Alex", Surname: "Hardman" },
                    { Id: 2, Forename: "Chris", Surname: "Thompson" }
                ];

                //When
                _tObj.showCustomers(data);

                //Then 
                expect(_tObj.listElement.find('li').length).toEqual(data.length);
                expect(_tObj.listElement.find('li')[0].outerText).toBe('Alex Hardman');
                expect(_tObj.listElement.find('li')[1].outerText).toBe('Chris Thompson');
            });
        });

        describe("showCustomers", function () {
            it("adds customer items that trigger 'loadCustomer' event when clicked", function () {
                //Given
                var id = 90210;
                var eventType = 'loadCustomer';

                data = [
                    { Id: id, Forename: "Alex", Surname: "Hardman" }
                ];

                var flag;

                var triggeredType;
                var triggeredData;

                //Set up listener for the eventType --> 'loadCustomer'
                $(document).on(eventType, function () {
                    triggeredType = arguments[0].type;
                    triggeredData = arguments[1];
                });

                //When
                _tObj.showCustomers(data);
                _tObj.listElement.find('li').first().click();
                //Then 
                expect(_tObj.listElement.find('li').length).toEqual(data.length);

                expect(triggeredType).toBe(eventType);
                expect(triggeredData).toBe(id);
            });
        });
    });
});

describe("js CustomerRespository", function () {
    var _tObj,
        _mockContext;

    afterEach(function () {
        _mockContext = undefined;
        _tObj = undefined;
    });

    describe("constructor", function () {
        it("creates object", function () {
            //Given
            _mockContext = {}

            //When
            _tObj = new CustomerRepository(_mockContext);

            //Then
            expect(_tObj).not.toBe(undefined);
        });
    });

    describe("repository method", function () {

        beforeEach(function () {
            _mockContext = {
                fetch: function () { }
            };
        });

        describe("getCustomers", function () {
            it("calls fetch with customers uri", function () {
                //Given 
                var expectedUri = '/api/customers';
                spyOn(_mockContext, "fetch").andReturn('stuff');

                //When
                _tObj = new CustomerRepository(_mockContext);
                var result = _tObj.getCustomers();

                //Then
                expect(_mockContext.fetch).toHaveBeenCalledWith(expectedUri);
                expect(result).toEqual('stuff')
            });
        });

        describe("getCustomerById", function () {
            it("calls fetch with customer uri and passed id", function () {
                //Given
                var id = 1;
                expectedUri = '/api/customers/' + id;
                spyOn(_mockContext, "fetch").andReturn('stuff');

                //When
                _tObj = new CustomerRepository(_mockContext);
                var result = _tObj.getCustomerById(id);

                //Then
                expect(_mockContext.fetch).toHaveBeenCalledWith(expectedUri);
                expect(result).toEqual('stuff')
            });
        });
    });
});