/* jshint node: true */
'use strict';

var $ = require('jquery');
var moment = require('moment');

var SwBuild = {
  page: 1,
  end: false,
  render: function(container) {
    var self = this;

    function _getBuildStatus(build) {
      // TODO: get build status
      return build.tasks.length + ' tasks';
    }

    $.getJSON('/api/builds?page=' + self.page, function(builds) {
      var tableRows = builds.map(function(b) {
        return '<tr>' +
               '  <td><a class="build-name">' + b.name + '</a></td>' +
               '  <td><a class="build-status">' + _getBuildStatus(b) + '</a></td>' +
               '  <td><a class="build-labels">' +
               b.labels.map(function(tag) {
                 return '<span class="tag label label-default">' + tag + '</span>';
               }).join('') + '</a></td>' +
               '  <td><a class="build-createat">' + moment(b.createat).fromNow() + '</a></td>' +
               '  <td><a class="build-action"><i class="fa fa-pencil-square-o"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    })
  }
};

SwBuild.render('#content-wrapper>table>tbody');

// scroll to the end of page, load extra tasks
$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() >= ($(document).height() - 20)) {
    if (SwBuild.end === false) {
      SwBuild.page++;
      SwBuild.render('#content-wrapper>table>tbody');
    }
  }
});

