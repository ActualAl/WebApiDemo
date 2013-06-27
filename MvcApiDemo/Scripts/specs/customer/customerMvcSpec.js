/// <reference path="../../jquery.js" />
/// <reference path="../../customer/customerMvc.js" />
describe("CustomersController", function () {

});

describe("CustomersView", function () {
    var _tObj;

    afterEach(function () {
        _tObj = undefined;
    });

    describe("contructor", function () {
        it("creates object", function () {
            //Given
            var el = "#anElement";

            //When
            _tObj = new CustomersView(el);

            //Then
            expect(_tObj).not.toBe(undefined);
        });
    });

    describe("functions", function () {

        var el = "#anElement";

        beforeEach(function () {
            _tObj = new CustomersView(el);
        });

        describe("showCUstomers", function () {
            it("does stuff", function () {
                //Given
                var el = "#anElement";

                //When

            });
        });
    });

    
});

describe("CustomerRespository", function () {
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
                fetch: function () {}
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