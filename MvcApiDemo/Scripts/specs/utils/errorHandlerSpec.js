/// <reference path="../../utils/errorHandler.js" />

describe("ErrorHandler", function () {

    var _tObj;

    beforeEach(function () {
        _tObj = new ErrorHandler();
    });

    afterEach(function () {
        _tObj = undefined;
    });

    describe("constructor", function () {

        it("creates object", function () {
            _tObj = new ErrorHandler();
            expect(_tObj).not.toBe(undefined);
        });
    });

    describe("handleApiError", function () {
        it("writes error to console", function () {
            //Given
            spyOn(console, 'log');

            var stubDetails = {
                url: "url",
                status: "status"
            };

            //When
            _tObj.handleApiError(stubDetails);

            //Then
            expect(window.console.log).toHaveBeenCalled();
        });

        it("writes url failed with status status", function () {
            //Given
            spyOn(console, 'log');

            var stubDetails = {
                url: "url",
                status: "status"
            };

            //When
            _tObj.handleApiError(stubDetails);
            
            //Then
            expect(window.console.log).toHaveBeenCalledWith('url' + ' failed with status: ' + 'status');
        });
    });
});