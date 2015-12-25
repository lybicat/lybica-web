/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');
var BootstrapDialog = require('bootstrap-dialog');
var _ = require('lodash');
var postJSON = require('./includes/utils').postJSON;
var Plan = require('./includes/plan');

function _formatCases(cases) {
  return cases.map(function(c) {
      return '<b>' + c.repo + ': </b>' + c.expr;
    }).join('<br>');
}

var TestPlan = {
  render: function(container) {
    $.getJSON('/api/plans', function(data) {
      var tableRows = data.map(function(d) {
        return '<tr>' +
               '  <td><a class="plan-name">' + d.name + '</a></td>' +
               '  <td><a class="plan-case">' + _formatCases(d.cases) + '<span class="badge">5</span></a></td>' +
               '  <td><a class="plan-env">' + d.devices.join(';') + '</a></td>' +
               '  <td><a id="' + d._id + '"class="plan-edit""><i class="fa fa-pencil-square-o"></i></a>' +
               '      <a id="' + d._id + '" class="plan-run""><i class="fa fa-youtube-play"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).empty().append(tableRows);
    });
  }
};


function makePlanEditable() {
  $('#planEditForm').removeClass('hidden');
  $('#planLabels').select2({tags: true});
  $('#planCaseRepo').select2();
  $('#planDevices').select2()https://api.github.com/search/repositoriesdata.id;;
  $('#planActions').select2();
}

// new plan
$('#newPlanBtn').click(function() {
  $('#planId').val('');
  $('#planName').val('');
  $('#planLabels').val([]);
  $('#planCaseRepo').val([]);
  $('#planCaseSet').val('');
  $('#planDevices').val([]);
  $('#planActions').val([]);
  makePlanEditable();
});

// TODO: add validation for form field, mandentory fields should not be empty
$('#saveBtn').click(function() {
  var data = {
    name: $('#planName').val().trim(),
    labels: $('#planLabels').val(),
    devices: $('#planDevices').val() || [],
    actions: $('#planActions').val() || [],
    parallel: $('#planParallel').prop('checked'),
  };
  var caseRepo = $('#planCaseRepo').val();
  var caseExpr = $('#planCaseSet').val();
  if (caseRepo && caseExpr) {
    data.cases = [{repo: caseRepo, expr: caseExpr.trim()}];
  }

  var apiUrl = $('#planId').val() === '' ? '/api/plans' : '/api/plan/' + $('#planId').val();

  postJSON(apiUrl, data, function() {
    $('#planEditForm').addClass('hidden');
    $.notify('plan saved!', {className: 'success', position: 'top center'});
    render();
  }, function() {
    $.notify('failed to save plan', {className: 'error', position: 'top center'});
  });
});

$('#cancelBtn').click(function() {
  $('#planEditForm').addClass('hidden');
});

// edit plan event binding
$('body').on('click', '.plan-edit', function(e) {
  var planId = $(this).prop('id');
  e.preventDefault();

  $.getJSON('/api/plan/' + planId, function(plan) {
    $('#planId').val(plan._id);
    $('#planName').val(plan.name);
    $('#planLabels').val(plan.labels);
    $('#planCaseRepo').val(_.map(plan.cases, 'repo'));
    $('#planCaseSet').val(_.map(plan.cases, 'expr').join(''));
    $('#planDevices').val(plan.devices);
    $('#planActions').val(plan.actions);
    makePlanEditable();
    $('html,body').scrollTop(0);
  });
});

// run plan event binding
$('body').on('click', '.plan-run', function(e) {
  var planId = $(this).prop('id');
  e.preventDefault();

  var runDialogTemplate = '<form class="form-horizontal">' +
      '  <div class="form-group">' +
      '    <label class="col-sm-4 control-label">Build Version: </label>' +
      '    <div class="col-sm-6"><input id="buildVersion" placeholder="Set Build Version here" class="form-control" type="text"></div>' +
      '  </div>' +
      '</form>';

  BootstrapDialog.show({
    title: 'Run the plan',
    message: runDialogTemplate,
    buttons: [{
      label: 'Run',
      action: function(dialogItself) {
        var buildId = $('#buildVersion').val().trim();
        Plan.run(planId, buildId, function(err) {
          if(err) return alert(err);

          dialogItself.close();
          window.location = '/'; // redirect to task page
        });
      }
    }, {
      label: 'Cancel',
      action: function(dialogItself){
        dialogItself.close();
      }
    }]
  });
});

function render() {
  TestPlan.render('#content-wrapper>table>tbody');
}

render();
