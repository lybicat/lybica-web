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

module.exports.enableSelect2 = function(container, reqUrl, reqType, resultFunc) {
  if (resultFunc === undefined) {
    resultFunc = function(result) {
      var mappedResults = result.map(function(k) {
        return {id: k};
      });

      return {results: mappedResults};
    }
  }
  $(container).select2({
    width: 'resolve',
    ajax: {
      url: reqUrl,
      type: reqType,
      traditional: true,
      dataType: 'json',
      contentType: 'application/json',
      delay: 500,
      processResults: resultFunc,
      cache: true
    },
    templateResult: function(datum) {
      if (datum.loading) return datum.text;

      return datum.id;
    },
    templateSelection: function(datum) {
      return datum.id || datum.text;
    },
  });
};

module.exports.infinitScroll = function(callback) {
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= ($(document).height() - 20)) {
      callback();
    }
  });
};

