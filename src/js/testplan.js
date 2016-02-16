/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');
var BootstrapDialog = require('bootstrap-dialog');
var _ = require('lodash');
var utils = require('./includes/utils');
var Plan = require('./includes/plan');


function _formatCases(cases) {
  return cases.map(function(c) {
    return c.repo.bold() + ': ' + c.expr;
  }).join('<br>');
}

var TestPlan = {
  page: 1, // current page
  end: false,
  render: function(container, clear) {
    var self = this;

    if (clear === true) {
      self.page = 1;
      self.end = false;
      $(container).empty();
    }

    $.getJSON('/api/plans?page=' + self.page, function(data) {
      if (data.length === 0) {
        self.end = true;
        return;
      }
      var tableRows = data.map(function(d) {
        return '<tr>' +
               '  <td><a class="plan-name">' + d.name + '</a></td>' +
               '  <td><a class="plan-case">' + _formatCases(d.cases) + '</a></td>' +
               '  <td><a class="plan-env">' + d.devices.join(';') + '</a></td>' +
               '  <td><a id="' + d._id + '" class="plan-edit""><i class="fa fa-pencil-square-o"></i></a>' +
               '      <a id="' + d._id + '" class="plan-run""><i class="fa fa-youtube-play"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};


function makePlanEditable(checkedSuites) {
  $('#planEditForm').removeClass('hidden');
  // make device type select2
  utils.enableSelect2('#planResources', '/api/devices', 'GET');
  // make case repo select2
  utils.enableSelect2('#planCaseRepo', '/api/cases/repos', 'POST');
  // make actions select2
  utils.enableSelect2('#planActions', '/api/actions', 'GET');
  // make triggers select2
  utils.enableSelect2('#planTriggers', '/api/triggers', 'GET');
}

// new plan
$('#newPlanBtn').click(function() {
  $('#planId').val('');
  $('#planName').val('');
  $('#planCaseSet').val('');
  $('#planResources').val([]);
  $('#planActions').val([]);
  $('#planTriggers').val([]);
  $('#delBtn').addClass('hidden');
  makePlanEditable([]);
});

// validation
function isValidPlanName(planId, planName, callback) {
  if (planName === '') return callback(false);

  $.getJSON('/api/plans?name=' + planName, function(plans) {
    var sameNamePlans = plans.filter(function(plan) {
      return planId != plan._id;
    });
    return callback(sameNamePlans.length === 0);
  });
}

// save plan
$('#saveBtn').click(function() {
  var planId = $('#planId').val();
  var planName = $('#planName').val().trim();
  var planResources = $('#planResources').val() || [];
  var planActions = $('#planActions').val() || [];
  var planTriggers = $('#planTriggers').val() || [];
  var planCaseRepo = $('#planCaseRepo').val();
  var planCaseExpr = $('#planCaseExpr').val().trim();

  var planCases = [{repo: planCaseRepo, expr: planCaseExpr}];

  isValidPlanName(planId, planName, function(isValid) {
    if (isValid === false) {
      $('#planName').focus();
      $('#planName').notify('plan name should be unique and not empty', 'error');
      return;
    }

    var data = {
      name: planName,
      devices: planResources,
      actions: planActions,
      triggers: planTriggers,
      cases: planCases
    };

    var apiUrl = planId === '' ? '/api/plans' : '/api/plan/' + planId;

    utils.postJSON(apiUrl, data, function() {
      $('#planEditForm').addClass('hidden');
      $.notify('plan saved!', {className: 'success', position: 'top center'});
      render(true);
    }, function() {
      $.notify('failed to save plan', {className: 'error', position: 'top center'});
    });
  });
});

$('#cancelBtn').click(function(e) {
  e.preventDefault();
  $('#planEditForm').addClass('hidden');
});

// edit plan event binding
$('body').on('click', '.plan-edit', function(e) {
  var planId = $(this).prop('id');
  e.preventDefault();

  $.getJSON('/api/plan/' + planId, function(plan) {
    $('#planId').val(plan._id);
    $('#planName').val(plan.name);
    // set plan device type value
    $('#planResources').empty();
    plan.devices.forEach(function(d) {
      $('#planResources').append('<option value="' + d + '" selected="selected"></option>');
    });
    $('#planResources').trigger('change');
    $('#planActions').val(plan.actions);
    $('#planTriggers').val(plan.triggers);
    var checkedSuites = _(plan.cases).map('expr').flatten().value();
    makePlanEditable(checkedSuites);
    $('#delBtn').removeClass('hidden');
    $('html,body').scrollTop(0);
  });
});

// run plan event binding
$('body').on('click', '.plan-run', function(e) {
  var planId = $(this).prop('id');
  e.preventDefault();

  BootstrapDialog.show({
    title: 'Run the plan',
    message: '<form class="form-horizontal">' +
             '  <div class="form-group">' +
             '    <label class="col-sm-4 control-label">Build Version: </label>' +
             '    <div class="col-sm-6">' +
             '      <select id="buildVersion" class="form-control"><option></option></select>' +
             '    </div>' +
             '  </div>' +
             '</form>',
    buttons: [{
      label: 'Run',
      action: function(dialogItself) {
        var buildId = $('#buildVersion').val().trim();
        Plan.run(planId, buildId, function(err) {
          if(err) return $.notify('failed to run the plan, error: ' + err);

          dialogItself.close();
          window.location = '/'; // redirect to task page
        });
      }
    }, {
      label: 'Cancel',
      action: function(dialogItself){
        dialogItself.close();
      }
    }],
    onshown: function(dialogItself) {
      var dialogModal = dialogItself.getModal();
      $(dialogModal).removeAttr('tabindex'); // refer to http://stackoverflow.com/questions/18487056/select2-doesnt-work-when-embedded-in-a-bootstrap-modal/18487440#18487440
      utils.enableSelect2('#buildVersion', '//10.140.90.13/api/getAllBuild', 'GET', function(result) {
        var mappedResults = result.map(function(k) {
          return {id: k.name};
        });

        return {results: mappedResults};
      });
    },
  });
});

// delete plan event binding
$('#delBtn').click(function() {
  var planId = $('#planId').val();
  if (planId === '') {
    $('#delBtn').notify('Cannot delete unsaved plan!', 'warn');
    return;
  }

  BootstrapDialog.show({
    title: 'Delete the plan',
    type: BootstrapDialog.TYPE_DANGER,
    message: 'Do you really want to delete this plan? This operation cannot be reverted!',
    buttons: [{
      label: 'Confirm',
      cssClass: 'btn-danger',
      action: function(dialogItself) {
        Plan.del(planId, function(err) {
          if(err) return $.notify('failed to delete the plan', {position: 'top center'});

          dialogItself.close();
          $('#planEditForm').addClass('hidden');
          render(true);
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

function render(clear) {
  TestPlan.render('#content-wrapper>table>tbody', clear);
}

render();

// scroll to the end of page, load extra plans
utils.infinitScroll(function() {
  if (TestPlan.end === false) {
    TestPlan.page++;
    render();
  }
});

