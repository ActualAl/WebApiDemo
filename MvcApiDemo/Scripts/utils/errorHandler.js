var ErrorHandler = window.ErrorHandler = function () {
    var self = this;

    self.handleApiError = function (details) {
        console.log(details.url + ' failed with status: ' + details.status);
    };
};