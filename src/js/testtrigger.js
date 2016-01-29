/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
var utils = require('./includes/utils');
var Thenjs = require('thenjs');

var TestTrigger = {
  page: 1, // current page
  end: false,
  render: function(container, clear) {
    var self = this;

    if (clear === true) {
      self.page = 1;
      self.end = false;
      $(container).empty();
    }

    $.getJSON('/api/triggers?page=' + self.page, function(data) {
      if (data.length === 0) {
        self.end = true;
        return;
      }
      var tableRows = data.map(function(d) {
        var onOff = d.disabled === true ? 'off' : 'on';
        return '<tr>' +
               '  <td><a class="trigger-name">' + d.name + '</a></td>' +
               '  <td><a class="trigger-type">' + d.type + '</a></td>' +
               '  <td><a class="trigger-url">' + d.url + '</a></td>' +
               '  <td><a id="' + d._id + '" class="trigger-edit"><i class="fa fa-pencil-square-o"></i></a>' +
               '      <a id="' + d._id + '" class="trigger-' + onOff + '"><i class="fa fa-toggle-' + onOff + '"></i></a></td>' +
               '</tr>';
      }).join('');

      $(container).append(tableRows);
    });
  }
};


// new trigger
$('#newTriggerBtn').click(function() {
  $('#triggerId').val('');
  $('#triggerName').val('');
  $('#triggerUrl').val('');
  $('#delBtn').addClass('hidden');
  $('#triggerEditForm').removeClass('hidden');
});


// edit trigger
$('body').on('click', '.trigger-edit', function(e) {
  var triggerId = $(this).prop('id');
  e.preventDefault();

  $.getJSON('/api/trigger/' + triggerId, function(trigger) {
    $('#triggerId').val(trigger._id);
    $('#triggerName').val(trigger.name);
    $('#triggerType').val(trigger.type);
    $('#triggerUrl').val(trigger.url);
    $('#triggerEditForm').removeClass('hidden');
    $('#delBtn').removeClass('hidden');
    $('html,body').scrollTop(0);
  });
});


// trigger name validation
function isValidName(triggerId, triggerName, callback) {
  if (triggerName === '') return callback(false);

  $.getJSON('/api/triggers?name=' + triggerName, function(triggers) {
    var sameNameTriggers = triggers.filter(function(trigger) {
      return triggerId != trigger._id;
    });
    return callback(sameNameTriggers.length === 0);
  });
}

// trigger validation
function _isValidSvnTrigger(trigger, callback) {
  // TODO
  callback(true);
}

function _isValidGitTrigger(trigger, callback) {
  // TODO
  callback(true);
}

function _isValidJsonTrigger(trigger, callback) {
  // TODO
  callback(true);
}

function isValidTrigger(triggerType, triggerUrl, callback) {
  switch(triggerType) {
    case 'svn':
      _isValidSvnTrigger(triggerUrl, callback);
      break;
    case 'git':
      _isValidGitTrigger(triggerUrl, callback);
      break;
    case 'json':
      _isValidJsonTrigger(triggerUrl, callback);
      break;
    default:
      // TODO: unsupported trigger type
      callback(false);
  }
}

// save trigger
$('#saveBtn').click(function() {
  var triggerId = $('#triggerId').val();
  var triggerName = $('#triggerName').val().trim();
  var triggerType = $('#triggerType').val().toLowerCase();
  var triggerUrl = $('#triggerUrl').val().trim();

  Thenjs(function(cont) {
    isValidName(triggerId, triggerName, function(isValid) {
      if(isValid === false) {
        var err = 'Invalid trigger name "' + triggerName + '", it should be unique and not empty!';
        $('#triggerName').notify(err, 'error');

        return cont(err);
      }

      return cont(null);
    });
  })
  .then(function(cont) {
    isValidTrigger(triggerType, triggerUrl, function(isValid) {
      if(isValid === false) {
        var err = 'Invalid ' + triggerType + ' trigger "' + triggerUrl + '"!';
        $('#triggerUrl').notify(err, 'error');

        return cont(err);
      }

      return cont(null);
    });
  })
  .fin(function(cont, err) {
    if(err === null) {
      var data = {
        name: triggerName,
        type: triggerType,
        url: triggerUrl
      }
      var apiUrl = triggerId === '' ? '/api/triggers' : '/api/trigger/' + triggerId;
      utils.postJSON(apiUrl, data, function() {
        $('#triggerEditForm').addClass('hidden');
        $.notify('plan saved!', {className: 'success', position: 'top center'});
        render(true);
      }, function() {
        $('#saveBtn').notify('failed to save trigger!', 'error');
      });
    }
  });
});


// toggle trigger on
$('body').on('click', '.trigger-off, .trigger-on', function(e) {
  var self = this;
  var triggerId = $(self).prop('id');
  var action = $(self).find('i').hasClass('fa-toggle-off') === true ? 'enable' : 'disable';
  var apiUrl = '/api/trigger/' + triggerId + '/' + action;

  e.preventDefault();
  $(self).find('i').toggleClass('fa-toggle-on fa-toggle-off');
  $.ajax({
    url: apiUrl,
    type: 'PUT'
  })
  .fail(function() {
    $(self).notify('failed to ' + action + ' trigger!', {position: 'left bottom', className: 'error'});
    $(self).find('i').toggleClass('fa-toggle-on fa-toggle-off');
  });
});

$('#cancelBtn').click(function(e) {
  e.preventDefault();
  $('#triggerEditForm').addClass('hidden');
});

function render(clear) {
  TestTrigger.render('#content-wrapper>table>tbody', clear);
}

render();

// scroll to the end of page, load extra triggers
utils.infinitScroll(function() {
  if (TestTrigger.end === false) {
    TestTrigger.page++;
    render();
  }
});

