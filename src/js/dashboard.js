var $ = require('jquery');

function Dashboard(container) {
    this._container = $(container);
}


Dashboard.prototype.render = function() {
    var self = this;

    self._container.empty().append();
}

module.exports = Dashboard;
