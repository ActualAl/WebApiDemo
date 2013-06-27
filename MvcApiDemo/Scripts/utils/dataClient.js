var DataClient = window.DataClient = function () {
    var self = this;

    var reply = function (r) {
        return r;
    };

    self.fetch = function (url) {
        return $.get(url).then(reply)
    };
};