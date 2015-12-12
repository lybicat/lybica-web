/* jshint node: true */
'use strict';

var $ = require('jquery');
global.jQuery = global.$ = $;
require('fullcalendar');
var BootstrapDialog = require('bootstrap-dialog');

var TestScheduler = {
  render: function(container) {
    $(container).fullCalendar({
      customButtons: {
          newSchedule: {
              text: 'New Schedule',
              click: function() {
                  BootstrapDialog.show({
                      message: 'Create new schedule here.'
                  });
              }
          }
      },
      header: {
          left: 'newSchedule',
          center: 'title',
          right: 'prev,today,next'
      },
      defaultDate: '2015-02-12',
      defaultView: 'agendaWeek',
      contentHeight: 'auto',
      eventLimit: true, // allow "more" link when too many events
      eventStartEditable: true,
      eventDurationEditable: false,
      events: [
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-02-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-02-16T16:00:00'
        },
        {
          title: 'Meeting',
          start: '2015-02-12T10:30:00',
          end: '2015-02-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2015-02-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2015-02-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2015-02-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2015-02-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2015-02-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2015-02-28'
        }
      ]
    });
  }
};

TestScheduler.render('#testScheduleCalendar');
