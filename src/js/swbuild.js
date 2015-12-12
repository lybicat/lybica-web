/* jshint node: true */
'use strict';

var $ = require('jquery');

var SwBuild = {
  render: function(container) {
    var data = [
      {status: 'new', name: 'build1024', release: 'trunk', tags: [], gpa: 'N/A'},
      {status: 'testing', name: 'build1023', release: 'trunk', tags: ['SMALL'], gpa: 'N/A'},
      {status: 'done', name: 'build1022', release: 'trunk', tags: ['SMALL', 'MEDIUM', 'LARGE'], gpa: '3.7'},
      {status: 'done', name: 'build1021', release: 'trunk', tags: ['SMALL'], gpa: '2.8'},
      {status: 'done', name: 'build1020', release: 'trunk', tags: ['SMALL', 'MEDIUM'], gpa: '3.2'},
    ];
    var tableRows = data.map(function(d) {
      return '<tr>' +
             '  <td><a class="device-status device-' + d.status + '">' + d.status + '</a></td>' +
             '  <td><a class="device-name">' + d.name + '</a></td>' +
             '  <td><a class="device-release">' + d.release + '</a></td>' +
             '  <td><a class="device-tags">' +
             d.tags.map(function(tag) {
                 return '<span class="tag label label-default">' + tag + '</span>';
             }).join('') + '</a></td>' +
             '  <td><a class="device-gpa">' + d.gpa + '</a></td>' +
             '  <td><a class="device-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
             '</tr>';
    }).join('');

    $(container).append(tableRows);
  }
};

SwBuild.render('#content-wrapper>table>tbody');
