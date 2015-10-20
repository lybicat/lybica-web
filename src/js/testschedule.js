// see https://github.com/Serhioromano/bootstrap-calendar
// demo http://bootstrap-calendar.azurewebsites.net/
var $ = require('jquery');

function TestScheduler(container) {
    this._container = $(container);
}


TestScheduler.prototype.render = function() {
    var self = this;

    self._container.empty().append();
}

module.exports = TestScheduler;
