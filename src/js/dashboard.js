var $ = require('jquery');

function Dashboard(container) {
    this._container = $(container);
}


Dashboard.prototype.render = function() {
    var self = this;

    var dashboard = '<ul class="nav navbar-nav">' +
         '  <li>' +
         '    <a href="#">Ongoing Build: TL15A_123414_23443_1234</a>' +
         '    <div class="progress progress-striped">' +
         '      <div class="progress-bar progress-bar-success" style="width: 40%">' +
         '        <span class="sr-only">PASS (40%)</span>' +
         '      </div>' +
         '      <div class="progress-bar progress-bar-danger" style="width: 15%">' +
         '        <span class="sr-only">FAILED (15%)</span>' +
         '      </div>' +
         '    </div>' +
         '  </li>' +
         '  <li>' +
         '    <a href="#">Last Finished Build: TL15A_123414_23422_1234</a>' +
         '    <div class="progress">' +
         '      <div class="progress-bar progress-bar-success" style="width: 60%">' +
         '        <span class="sr-only">PASS (60%)</span>' +
         '      </div>' +
         '      <div class="progress-bar progress-bar-danger" style="width: 40%">' +
         '        <span class="sr-only">FAILED (40%)</span>' +
         '      </div>' +
         '    </div>' +
         '  </li>' +
         '  <li><a href="#">Running Tasks <span class="badge">32</span></a></li>' +
         '  <li><a href="#">Pending Tasks <span class="badge">5</span></a></li>' +
         '  <li><a href="#">Idle Env <span class="badge">1,118</span></a></li>' +
         '</ul>';

    self._container.empty().append(dashboard);
}

module.exports = Dashboard;
