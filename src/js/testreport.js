var d3 = require('d3');

function TestReporter(container) {
    this._container = container;
}


TestReporter.prototype.render = function() {
    var self = this;

    d3.select(self._container);
}

module.exports = TestReporter;
