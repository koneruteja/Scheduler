// Display Date
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// Time Audit Start
// Time Audit Function
var timeAudit = function (taskEl) {
    var hour = taskEl.attr("id");
    var time = moment(hour, "HH a");

    taskEl.removeClass("past present future");

    if (moment().hour() === time.hour()) {
        taskEl.addClass("present");
    }
    else if (moment().isBefore(time)) {
        taskEl.addClass("future");
    }
    else {
        taskEl.addClass("past");
    }
}

// Audit On Page Load
$(".task-box").each(function () {
    timeAudit($(this));
})

// Audit On Every Hour
setInterval(function () {
    if (moment().minutes() === 0) { // IF the time is on the hour
        $(".task-box").each(function () {
            timeAudit($(this));
        })
    }
}, (1000 * 60)) // check every minute
// Time Audit End

// Save and Load Start
// Save (on save button click)
$("i").on("click", function () {
    var taskId = $(this) // get task id
        .closest(".row")
        .find(".task-box")
        .attr("id")
    var taskText = $(this) // get task text
        .closest(".row")
        .find(".task-box")
        .val()
    localStorage.setItem(taskId, taskText); // save text by id
});

// Load (on page load)
$(".task-box").each(function () {
    var taskId = $(this).attr("id") // get task id
    var savedTask = localStorage.getItem(taskId); // get saved task
    $(this).val(savedTask) // load saved task
})