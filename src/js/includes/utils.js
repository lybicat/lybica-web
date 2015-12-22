/* jshint node: true */
'use strict';

var $ = require('jquery');

module.exports.getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariable = sPageURL.split('&').map(function(varStr) {
            return varStr.split('=');
        }).filter(function(vars) {
            return vars[0] === sParam;
        }).pop();
    if (sURLVariable !== undefined) {
        return sURLVariable[1] || true;
    }
    return null;
};

module.exports.postJSON = function(url, data, callback, errCallback) {
  $.ajax({
      url: url,
      type: 'POST',
      traditional: true,
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
  })
  .done(callback)
  .fail(errCallback);
};

