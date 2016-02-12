var runningTimers = [];
var timerIntervals = {};
var dbRef = new Firebase("https://ollis-time-tracker.firebaseio.com/")

function toggleTimer(event) {
  //If timer is off start timer
  if (runningTimers.indexOf(event.id) == -1) {
    $(event).removeClass("btn-default");
    $(event).addClass("btn-success");
    runningTimers.push(event.id);
    timerIntervals[event.id] = setInterval(function() {
      updateDisplay(event);
    }, 1000);
  } else {
    //Turn timer off
    runningTimers.splice(runningTimers.indexOf(event.id), 1);
    clearInterval(timerIntervals[event.id]);
    timerIntervals[event.id] = null;
    $(event).removeClass("btn-success");
    $(event).addClass("btn-default");
  }
  console.log(runningTimers);
}

//turn timer into displable format and update screen
function updateDisplay(event) {
  console.log($(event).html())
  var timer = ($(event).html()).split(":");
  timer = Number(timer[0] * 60) + Number(timer[1]) + 1;
  console.log(timer);
  var min = addDigit(Math.floor(timer / 60));
  var sec = addDigit(Math.floor(timer % 60));
  $(event).html(min + ":" + sec);
}
//Add a '0' in front of singal digits
function addDigit(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

function createTimer() {
  var id = (new Date).getTime();
  var row = '<div id=' + id + ' class="row ticket"> \
    <div class=""> \
      <div class="col-xs-12">\
        <div class="row time-row">\
          <div class="col-xs-11 text-center">\
            <button id="timer_' + id + '" onclick="toggleTimer(this)" class="btn btn-default timer btn-timer">00:00</button>\
          </div>\
          <button class="btn btn-danger col-xs-1" onclick="removeTimer(' + id + ')"><i class="fa fa-minus"></i></button>\
        </div>\
        <div class="row">\
          <input type="text" placeholder="Client / Issue"/>\
        </div>\
      </div>\
    </div>\
    <div class="">\
      <div class="col-xs-12 col-md-6">\
        <div class="row h4 subtitle">\
          Call Notes:\
        </div>\
        <div class="row">\
          <textarea class="form-control" rows=5></textarea>\
        </div>\
      </div>\
      <div class="col-xs-12 col-md-6">\
        <div class="row h4 subtitle">\
          Actions Taken:\
        </div>\
        <div class="row">\
          <textarea class="form-control" rows=5></textarea>\
        </div>\
      </div>\
     </div>\
  </div>';

  $("#container").prepend(row);
}

function removeTimer(id) {
  var results = confirm("Are you sure you want to remove this timer?");
  if (results == false) {
    return;
  }
  //stops time if its running before removal
  if (runningTimers.indexOf(event.id) != -1) {
    //Turn timer off
    runningTimers.splice(runningTimers.indexOf(event.id), 1);
    clearInterval(timerIntervals[event.id]);
    timerIntervals[event.id] = null;
  }
  $("#" + id).remove();
}

function init() {
  $("#addTimer").click(function() {
    createTimer();
  });
  createTimer()
  blinkCursor(true);
}

//Logo Animation
function blinkCursor(on) {
  if (on) {
    $("#cursor").html("&nbsp;");
  } else {
    $("#cursor").html("_");
  }
  setTimeout(function() {
    blinkCursor(!on);
  }, 800);
}

$(document).ready(init());