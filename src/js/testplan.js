/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('select2');
var BootstrapDialog = require('bootstrap-dialog');
var _ = require('lodash');
var utils = require('./includes/utils');
var Plan = require('./includes/plan');

var defaultActions = ['task_hook', 'run_pickup'];

function _formatCases(cases) {
  var casesCount = cases.reduce(function(result, c) {
    return result + (typeof(c.expr) === 'object' ? c.expr.length : 1);
  }, 0);

  if (casesCount === 0) return 'N/A';

  var casesExpr = cases[0].expr;

  if (typeof(casesExpr) === 'object') casesExpr = casesExpr[0];
  if (casesCount > 1) casesExpr += '...';

  return casesExpr + '<span class="badge">' + casesCount + '</span>';
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

function _generateSuitesTree(suites, checkedSuites) {
  return _(suites)
    .filter(function(svnPath) {
      return svnPath !== null && svnPath !== '';
    })
    .reduce(function(result, svnpath) {
      var thisResult = result;
      var pathList = svnpath.split('/');

      pathList.forEach(function(pathName) {
        var _id = _.findIndex(thisResult, function(s) {
          return s.text === pathName;
        });

        if (_id === -1) {
          if (pathList.indexOf(pathName) === pathList.length - 1) {
            var node = {text: pathName, svnpath: svnpath};
            if (checkedSuites.indexOf(svnpath) > -1) {
              node.state = {checked: true, expanded: true};
            }
            thisResult.push(node);
          } else {
            thisResult.push({text: pathName, nodes: []});
          }
          _id = thisResult.length - 1;
        }

        thisResult = thisResult[_id].nodes;
      });

      return result;
    }, []);
}


function _getParents(nodes, thisArg) {
  var parentNodes = [];
  nodes.forEach(function(node) {
    var parent = thisArg.treeview('getParent', node);
    while(parent.nodeId !== undefined) {
      parentNodes.push(parent.nodeId);
      parent = thisArg.treeview('getParent', parent);
    }
  });

  return _.uniq(parentNodes);
}

function _getChildren(node) {
  if (node.nodes === undefined) return [];
  var childrenNodes = node.nodes;
  node.nodes.forEach(function(n) {
    childrenNodes = childrenNodes.concat(_getChildren(n));
  });

  return childrenNodes;
}

function makePlanEditable(checkedSuites) {
  $('#planEditForm').removeClass('hidden');
  // make device type select2
  utils.enableSelect2('#planDevices', '/api/devices', 'GET', function(result) {
    var mappedResults = result.map(function(k) {
      return {id: k};
    });

    return {results: mappedResults};
  });
  // make actions select2
  $('#planActions').select2();
  // make case set as treeview
  $('#planCaseSet').html('<h3><i class="fa fa-spinner fa-pulse"></i>loading cases...</h3>');
  $.getJSON('/api/suites', function(suites) {
    $('#planCaseSet').empty();
    $('#planCaseSet').treeview({
      data: _generateSuitesTree(suites, checkedSuites),
      levels: 1,
      showCheckbox: true,
      showBorder: false,
      showTags: false,
      selectable: false,
      multiSelect: true,
      highlightSelected: false,
      expandIcon: 'fa fa-plus-square-o',
      collapseIcon: 'fa fa-minus-square-o',
      checkedIcon: 'fa fa-check-square-o',
      uncheckedIcon: 'fa fa-square-o',
      onNodeChecked: function(event, node) {
        var parentNodes = _getParents([node], $(this));
        var childrenNodes = _.map(_getChildren(node), 'nodeId');
        var allNodes = parentNodes.concat(childrenNodes);
        $(this).treeview('checkNode', [allNodes, {silent: true}]);
      },
      onNodeUnchecked: function(event, node) {
        var childrenNodes = _.map(_getChildren(node), 'nodeId');
        $(this).treeview('uncheckNode', [childrenNodes, {silent: true}]);
        // TODO: uncheck one node, uncheck all its children nodes, if it's the last checked node of parent nodes, uncheck them
      },
    });
    // check and expand all parent nodes
    var parentNodes = _getParents($('#planCaseSet').treeview('getChecked'), $('#planCaseSet'));
    $('#planCaseSet').treeview('checkNode', [parentNodes, {silent: true}]);
    $('#planCaseSet').treeview('expandNode', [parentNodes, {silent: true}]);
  });
}

// new plan
$('#newPlanBtn').click(function() {
  $('#planId').val('');
  $('#planName').val('');
  $('#planCaseSet').val('');
  $('#planDevices').val([]);
  $('#planActions').val(defaultActions);
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
  var planDevices = $('#planDevices').val() || [];
  var planActions = $('#planActions').val() || [];
  var _checkedCases = $('#planCaseSet').treeview('getChecked')
    .filter(function(c) {
      return c.svnpath !== undefined;
    })
    .map(function(c) {
      return c.svnpath;
    });

  if (_checkedCases.length === 0) {
    $('#planCaseSet').focus();
    $('#planCaseSet').notify('at least one suite should be selected', 'error');
    return;
  }

  var planCases = [{repo: 'LTETEST', expr: _checkedCases}];

  isValidPlanName(planId, planName, function(isValid) {
    if (isValid === false) {
      $('#planName').focus();
      $('#planName').notify('plan name should be unique and not empty', 'error');
      return;
    }

    var data = {
      name: planName,
      devices: planDevices,
      actions: planActions,
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
    $('#planDevices').empty();
    plan.devices.forEach(function(d) {
      $('#planDevices').append('<option value="' + d + '" selected="selected"></option>');
    });
    $('#planDevices').trigger('change');
    $('#planActions').val(plan.actions);
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

