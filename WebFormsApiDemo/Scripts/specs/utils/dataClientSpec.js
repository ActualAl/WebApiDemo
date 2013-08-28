/// <reference path="../../jquery.js" />
/// <reference path="../../utils/dataClient.js" />
describe("js DataClient", function () {

    var _tObj;

    beforeEach(function(){
        _tObj = new DataClient();
    });

    afterEach(function () {
        _tObj = undefined;
    });

    describe("constructor", function () {

        it("creates object", function () {
            expect(_tObj).not.toBe(null);
        });
    });

    describe("fetch", function () {

        it("should make a get request to the passed url", function () {
            //Given
            var url = "fakeApiUrl";

            spyOn($, "get").andCallFake(function (req) {
                var stubDeferred = $.Deferred();
                stubDeferred.resolve();
                return stubDeferred.promise();
            });

            //When
            var result = _tObj.fetch(url);

            //Then
            expect($.get.mostRecentCall.args[0]).toEqual(url);
        });
    });

    
});