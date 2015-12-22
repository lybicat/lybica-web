/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');
var postJSON = require('./includes/utils').postJSON;

var ResourceManager = {
  render: function(container) {
    var data = [
      {status: 'idle', name: 'BTS-1', ip: '127.1.1.2', build: 'TL15A_2341414_2412414', tags: ['FSIH']},
      {status: 'running', name: 'BTS-2', ip: '127.1.2.2', build: 'TL15A_2341414_2412413', tags: ['FSMF', 'CI', 'GOLDEN']},
      {status: 'idle', name: 'BTS-3', ip: '127.1.3.2', build: 'TL15A_2341414_2412414', tags: ['FSMF']},
      {status: 'maintaining', name: 'BTS-4', ip: '127.1.4.2', build: 'TL15A_2341414_2412414', tags: ['FSMF', 'SPRING']},
      {status: 'maintaining', name: 'BTS-5', ip: '127.1.5.2', build: 'TL15A_2341414_2412414', tags: ['FSIH', 'CMCC']},
    ];
    var dataRows = data.map(function(d) {
      return '<tr>' +
             '  <td><a class="resource-status">' + d.status + '</a></td>' +
             '  <td><a class="resource-name">' + d.name + '</a></td>' +
             '  <td><a class="resource-ip">' + d.ip + '</a></td>' +
             '  <td><a class="resource-build">' + d.build + '</a></td>' +
             '  <td><a class="resource-tags">' +
             d.tags.map(function(tag) {
                 return '<span class="tag label label-default">' + tag + '</span>';
             }).join('') + '</a></td>' +
             '  <td><a class="plan-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
             '</tr>';
    }).join('');

    $(container).append(dataRows);
  }
};

$('#newDeviceBtn').click(function() {
  $('#deviceEditForm').removeClass('hidden');
  $('#devLabels').select2({tags: true});
});

$('#saveBtn').click(function() {
  // TODO: save device here
  $('#deviceEditForm').addClass('hidden');
});

$('#cancelBtn').click(function() {
  $('#deviceEditForm').addClass('hidden');
});

ResourceManager.render('#content-wrapper>table>tbody');
