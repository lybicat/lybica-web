var $ = require('jquery');
var d3 = require('d3');

function TestReporter(container) {
    this._container = $(container);
}


TestReporter.prototype.render = function() {
    var self = this;

    self._container.empty().append();
}

module.exports = TestReporter;
